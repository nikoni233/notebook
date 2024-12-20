import pyautogui
import pynput.keyboard as keyboard
import pygetwindow as gw
import time
from pywinauto import Application
import datetime  # 导入datetime模块

MOVE_STEP = 50  # 每步的像素
KEY_MAPPINGS = {
    'Q': 'q',  # Q技能
    'W': 'w',  # W技能
    'E': 'e',  # E技能
}

# 记录窗口的激活状态
window_activated = False


def current_time():
    return f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}]"


def focus_game_window(window_title):
    global window_activated
    try:
        window = gw.getWindowsWithTitle(window_title)[0]

        # 只在程序启动时激活窗口
        if not window_activated:
            if window.isMinimized:
                print(f"{current_time()} 窗口被最小化，恢复窗口...")
                window.restore()
            window.activate()  # 激活窗口
            print(f"{current_time()} 激活窗口: {window_title}")
            window_activated = True  # 确保只激活一次

        # 每次执行指令时，检查窗口是否最小化
        if window.isMinimized:
            print(f"{current_time()} 窗口最小化，恢复窗口...")
            window.restore()
        else:
            window.activate()  # 强制将目标窗口置为前置窗口
            print(f"{current_time()} 窗口 {window_title} 已经是活动窗口")

    except IndexError:
        print(f"{current_time()} 未找到名为'{window_title}'的窗口！")
    except Exception as e:
        print(f"{current_time()} 发生错误: {e}")


def move_character(direction, distance, window_title):
    print(f"{current_time()} 给出指令：向{direction}走 {distance} 米")
    # 获取窗口的位置和大小
    window = gw.getWindowsWithTitle(window_title)[0]
    window_center_x, window_center_y = window.center  # 窗口中心位置

    # 计算目标位置
    pixels = distance * MOVE_STEP  # 假设1米对应MOVE_STEP像素
    if direction == 'left':
        target_x = window_center_x - pixels
        target_y = window_center_y
    elif direction == 'right':
        target_x = window_center_x + pixels
        target_y = window_center_y
    elif direction == 'up':
        target_x = window_center_x
        target_y = window_center_y - pixels
    elif direction == 'down':
        target_x = window_center_x
        target_y = window_center_y + pixels
    else:
        target_x = window_center_x
        target_y = window_center_y

    # 移动鼠标到目标位置并点击
    pyautogui.moveTo(target_x, target_y, duration=0.1)  # 快速移动
    pyautogui.click()  # 点击鼠标
    print(f"{current_time()} 完成指令：向{direction}走 {distance} 米")


def use_skill(skill, window_title):
    print(f"{current_time()} 给出指令：使用 {skill} 技能")
    # focus_game_window(window_title)  # 每次使用技能时先激活游戏窗口

    # 获取目标窗口句柄并强制激活
    window = gw.getWindowsWithTitle(window_title)[0]
    if window.isMinimized:
        window.restore()
    # window.activate()  # 强制将目标窗口置为前置窗口

    key = KEY_MAPPINGS.get(skill)
    if key:
        controller = keyboard.Controller()
        controller.press(key)
        time.sleep(0.1)
        controller.release(key)
        print(f"{current_time()} 完成指令：使用 {skill} 技能")
    else:
        print(f"{current_time()} 错误：未找到 {skill} 技能的键位映射")


def click_at(x, y):
    print(f"{current_time()} 给出指令：点击位置 ({x}, {y})")
    pyautogui.click(x, y)
    print(f"{current_time()} 完成指令：点击位置 ({x}, {y})")
