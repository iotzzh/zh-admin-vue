VITE_ENVIRONMENT=pro

# 与nginx中的location保持一致
# 参考：https://blog.csdn.net/m0_50360903/article/details/136972706
VITE_PUBLIC_PATH=

VITE_TITLE=后台管理系统

# 添加到配置文件的原因 可以设置某个项目原始布局，而不需要修改代码
# 当界面存在切换按钮时，也会先从storage取, 默认：vertical
VITE_LAYOUT=vertical

# 设置路由数据来源：file, directory, api
# 分别代表：来自静态文件，根据目录结构生成，通过api请求获得
VITE_ROUTE_DATA_SOURCE=file