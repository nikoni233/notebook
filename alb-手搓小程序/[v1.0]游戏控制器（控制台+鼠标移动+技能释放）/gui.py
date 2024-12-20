import tkinter as tk
from tkinter import messagebox
import threading  # 导入 threading 库
from controller import move_character, use_skill, focus_game_window

class GameControllerApp:
    def __init__(self, root, window_title):
        self.root = root
        self.root.title("游戏控制面板")
        self.window_title = window_title

        # 激活窗口，只需要在初始化时执行一次
        focus_game_window(self.window_title)

        self.create_widgets()

    def create_widgets(self):
        # 创建控件
        self.move_label = tk.Label(self.root, text="输入指令 (例如: 向左走5米):")
        self.move_label.pack()

        self.command_entry = tk.Entry(self.root, width=30)
        self.command_entry.pack()

        self.execute_button = tk.Button(self.root, text="执行", command=self.execute_command)
        self.execute_button.pack()

        self.skill_label = tk.Label(self.root, text="选择技能:")
        self.skill_label.pack()

        self.skill_button_q = tk.Button(self.root, text="使用Q技能", command=lambda: self.use_skill('Q'))
        self.skill_button_q.pack()

        self.skill_button_w = tk.Button(self.root, text="使用W技能", command=lambda: self.use_skill('W'))
        self.skill_button_w.pack()

        self.skill_button_e = tk.Button(self.root, text="使用E技能", command=lambda: self.use_skill('E'))
        self.skill_button_e.pack()

        self.quit_button = tk.Button(self.root, text="退出", command=self.quit)
        self.quit_button.pack()

        # 置顶开关变量
        self.top_switch_var = tk.BooleanVar()  # 变量，用于存储复选框的状态
        self.top_switch = tk.Checkbutton(self.root, text="窗口置顶", variable=self.top_switch_var,
                                         command=self.toggle_top)
        self.top_switch.pack()

    def toggle_top(self):
        """根据开关的状态设置窗口是否置顶"""
        if self.top_switch_var.get():
            self.root.wm_attributes("-topmost", 1)  # 设置窗口置顶
        else:
            self.root.wm_attributes("-topmost", 0)  # 取消置顶

    def execute_command(self):
        command = self.command_entry.get()
        threading.Thread(target=self.process_command, args=(command,)).start()  # 使用线程来执行命令

    def process_command(self, command):
        focus_game_window(self.window_title)  # 执行指令前，先将窗口置前
        if '走' in command:
            direction, distance = self.parse_move_command(command)
            move_character(direction, distance, self.window_title)  # 传递窗口标题给控制器
        else:
            messagebox.showerror("错误", "无法识别的指令！")

    def parse_move_command(self, command):
        if '左' in command:
            direction = 'left'
        elif '右' in command:
            direction = 'right'
        elif '上' in command:
            direction = 'up'
        elif '下' in command:
            direction = 'down'
        else:
            direction = 'right'  # 默认向右
        distance = int(''.join(filter(str.isdigit, command)))  # 提取数字部分
        return direction, distance

    def use_skill(self, skill):
        threading.Thread(target=self.process_skill, args=(skill,)).start()  # 使用线程来执行技能

    def process_skill(self, skill):
        focus_game_window(self.window_title)  # 执行技能前，先将窗口置前
        use_skill(skill, self.window_title)  # 传递窗口标题给控制器

    def quit(self):
        self.root.quit()
        self.root.destroy()

def run_app():
    import sys
    window_title = "Albion Online Client"
    root = tk.Tk()
    app = GameControllerApp(root, window_title)
    root.mainloop()

if __name__ == '__main__':
    run_app()
