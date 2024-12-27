import pygetwindow as gw

def get_window_center(window_title):
    """获取目标窗口的中心位置"""
    try:
        window = gw.getWindowsWithTitle(window_title)[0]
        return window.center  # 返回窗口的中心坐标
    except IndexError:
        print(f"未找到名为'{window_title}'的窗口！")
        return None

def get_relative_offset(window_title, click_x, click_y):
    """获取点击位置相对于窗口中心的偏移量"""
    center_x, center_y = get_window_center(window_title)
    if center_x is None:
        return None

    # 计算偏移量
    offset_x = click_x - center_x
    offset_y = click_y - center_y
    return offset_x, offset_y

def on_click(x, y, window_title):
    """鼠标点击事件处理函数"""
    offset = get_relative_offset(window_title, x, y)
    if offset:
        offset_x, offset_y = offset
        print(f"点击位置相对于窗口中心的偏移量: ({offset_x}, {offset_y})")
