import win32gui

def enum_windows(hwnd, result):
    # 获取窗口标题
    window_title = win32gui.GetWindowText(hwnd)
    # 如果窗口标题不为空，则存储句柄和标题
    if window_title:
        result.append((hwnd, window_title))

# 存储窗口句柄和标题的列表
hwnd_title_list = []
win32gui.EnumWindows(enum_windows, hwnd_title_list)

# 输出所有窗口的句柄和标题
for hwnd, title in hwnd_title_list:
    print(f"窗口标题: {title}, 窗口句柄: {hwnd}")
