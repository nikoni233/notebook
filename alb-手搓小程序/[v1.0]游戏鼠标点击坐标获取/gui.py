import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
import pygetwindow as gw
from controller import on_click
from pynput.mouse import Listener
import threading
import time
import pyautogui

class GameClickTrackerApp:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Game Click Tracker")
        self.root.geometry("900x400")

        # 当前监听窗口的标题
        self.window_title = ""
        self.is_listening = False
        self.listener = None
        self.is_always_on_top = False  # 控制窗口是否置顶
        self.offset_x = 0  # 用户输入的X偏移
        self.offset_y = 0  # 用户输入的Y偏移

        # 创建控制面板
        self.create_widgets()

    def create_widgets(self):
        # 创建左侧框架
        left_frame = tk.Frame(self.root)
        left_frame.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=10)

        # 1. 窗口选择下拉框
        self.window_options = self.get_window_options()
        self.window_dropdown = ttk.Combobox(left_frame, values=self.window_options, width=50, state="readonly")
        self.window_dropdown.set("请选择目标窗口")
        self.window_dropdown.pack(pady=10)

        # 2. 鼠标监听开关
        self.toggle_button = tk.Button(left_frame, text="开启监听", command=self.toggle_listening)
        self.toggle_button.pack(pady=10)

        # 3. 显示当前状态
        self.status_label = tk.Label(left_frame, text="当前状态: 停止监听", font=("Arial", 12))
        self.status_label.pack(pady=10)

        # 4. 偏移量输入框和微调按钮
        self.offset_label = tk.Label(left_frame, text="设置偏移量：", font=("Arial", 12))
        self.offset_label.pack(pady=5)

        self.offset_x_input = tk.Entry(left_frame, width=10)
        self.offset_x_input.pack(side=tk.LEFT, padx=5)
        self.offset_y_input = tk.Entry(left_frame, width=10)
        self.offset_y_input.pack(side=tk.LEFT, padx=5)

        self.offset_button = tk.Button(left_frame, text="执行点击", command=self.simulate_click)
        self.offset_button.pack(pady=10)

        # 微调按钮
        self.offset_x_up_button = tk.Button(left_frame, text="↑", command=lambda: self.adjust_offset('x', 1))
        self.offset_x_up_button.pack(side=tk.LEFT)
        self.offset_x_down_button = tk.Button(left_frame, text="↓", command=lambda: self.adjust_offset('x', -1))
        self.offset_x_down_button.pack(side=tk.LEFT)

        self.offset_y_up_button = tk.Button(left_frame, text="↑", command=lambda: self.adjust_offset('y', 1))
        self.offset_y_up_button.pack(side=tk.LEFT)
        self.offset_y_down_button = tk.Button(left_frame, text="↓", command=lambda: self.adjust_offset('y', -1))
        self.offset_y_down_button.pack(side=tk.LEFT)

        # 5. 控制台置顶开关
        self.top_toggle_button = tk.Checkbutton(left_frame, text="控制台窗口置顶", command=self.toggle_always_on_top)
        self.top_toggle_button.pack(pady=10)

        # 创建右侧框架，用于显示控制台输出
        right_frame = tk.Frame(self.root)
        right_frame.pack(side=tk.RIGHT, fill=tk.Y, padx=10, pady=10)

        # 输出显示区域
        self.console_output = tk.Text(right_frame, wrap=tk.WORD, height=20, width=60)
        self.console_output.config(state=tk.DISABLED)  # 设置为只读
        self.console_output.pack()

        # 初始化UI更新
        self.update_status_label()

    def get_window_options(self):
        """获取当前运行的所有窗口（窗口名称+窗口句柄）"""
        windows = gw.getAllWindows()
        return [f"{win.title} (句柄: {win._hWnd})" for win in windows]

    def toggle_listening(self):
        """切换监听鼠标点击功能开关"""
        if self.is_listening:
            self.is_listening = False
            self.toggle_button.config(text="开启监听")
            self.update_status_label()
            if self.listener:
                self.listener.stop()  # 停止监听
                self.listener = None
            self.update_console("关闭监听")
        else:
            # 检查是否选择目标窗口
            if not self.window_dropdown.get() or self.window_dropdown.get() == "请选择目标窗口":
                messagebox.showerror("错误", "请选择一个目标窗口！")
                return

            self.is_listening = True
            self.toggle_button.config(text="停止监听")
            self.update_status_label()
            self.start_tracking()

    def update_status_label(self):
        """更新状态标签"""
        status = "当前状态: 正在监听..." if self.is_listening else "当前状态: 停止监听"
        self.status_label.config(text=status)

    def start_tracking(self):
        """开始监听目标应用窗口点击事件"""
        def track_clicks():
            window_title = self.window_dropdown.get().split(" ")[0]  # 获取下拉框选择的窗口标题
            if not window_title:
                messagebox.showerror("错误", "请选择一个目标窗口！")
                return

            # 获取窗口并激活
            self.update_status_label()
            window = gw.getWindowsWithTitle(window_title)
            if not window:
                messagebox.showerror("错误", "目标窗口不存在，请重新选择窗口！")
                self.refresh_window_options()
                return
            window = window[0]
            window.activate()  # 激活窗口

            def on_click_listener(x, y, button, pressed):
                if pressed and self.is_listening:
                    # 只在鼠标按下时获取位置
                    self.get_and_update_offset(x, y, window)

            # 使用 pynput 监听鼠标点击事件
            with Listener(on_click=on_click_listener) as listener:
                self.listener = listener
                listener.join()

        # 使用线程避免阻塞UI界面
        tracking_thread = threading.Thread(target=track_clicks)
        tracking_thread.daemon = True
        tracking_thread.start()

    def get_and_update_offset(self, x, y, window):
        """获取窗口中心和鼠标点击位置的偏移量，并更新控制台输出"""
        window_rect = window._rect
        window_center_x = window_rect.left + window_rect.width // 2
        window_center_y = window_rect.top + window_rect.height // 2

        offset_x = x - window_center_x
        offset_y = y - window_center_y

        self.update_console(f"窗口中心: ({window_center_x}, {window_center_y}), 点击偏移量: ({offset_x}, {offset_y})")

    def update_console(self, message):
        """更新控制台输出"""
        self.console_output.config(state=tk.NORMAL)  # 允许编辑
        self.console_output.insert(tk.END, f"[{time.strftime('%H:%M:%S')}] {message}\n")
        self.console_output.config(state=tk.DISABLED)  # 禁止编辑
        self.console_output.yview(tk.END)  # 滚动到最新内容

    def refresh_window_options(self):
        """刷新目标窗口选择框"""
        self.window_options = self.get_window_options()
        self.window_dropdown.config(values=self.window_options)
        self.window_dropdown.set("请选择目标窗口")

    def toggle_always_on_top(self):
        """控制窗口置顶"""
        self.is_always_on_top = not self.is_always_on_top
        if self.is_always_on_top:
            self.root.attributes('-topmost', 1)
        else:
            self.root.attributes('-topmost', 0)

    def simulate_click(self):
        """模拟点击：根据偏移量点击目标窗口"""
        try:
            self.offset_x = int(self.offset_x_input.get())
            self.offset_y = int(self.offset_y_input.get())
            # 获取当前目标窗口
            window_title = self.window_dropdown.get().split(" ")[0]
            window = gw.getWindowsWithTitle(window_title)
            if not window:
                messagebox.showerror("错误", "目标窗口不存在，请重新选择窗口！")
                return

            window = window[0]
            # 获取窗口中心坐标
            window_rect = window._rect
            window_center_x = window_rect.left + window_rect.width // 2
            window_center_y = window_rect.top + window_rect.height // 2

            # 计算目标点击位置
            target_x = window_center_x + self.offset_x
            target_y = window_center_y + self.offset_y

            # 使用pyautogui模拟点击
            pyautogui.click(target_x, target_y)
            self.update_console(f"模拟点击: ({target_x}, {target_y})")

        except ValueError:
            messagebox.showerror("错误", "请输入有效的数字！")

    def adjust_offset(self, direction, value):
        """微调偏移量"""
        if direction == 'x':
            self.offset_x += value
            self.offset_x_input.delete(0, tk.END)
            self.offset_x_input.insert(0, str(self.offset_x))
        elif direction == 'y':
            self.offset_y += value
            self.offset_y_input.delete(0, tk.END)
            self.offset_y_input.insert(0, str(self.offset_y))

    def run(self):
        self.root.mainloop()
