# 设置基础镜像
FROM bubaiwantong/nginx:latest
# 作者
MAINTAINER JavaGPT 2631416434@qq.com
# 执行命令，主要用来安装相关的软件

RUN rm /etc/nginx/conf.d/default.conf

ADD default.conf /etc/nginx/conf.d/

# 设置时区
RUN rm -f /etc/localtime \
&& ln -sv /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone

# 添加文件
# 将dist文件中的内容复制到指定目录下
COPY dist/  /usr/share/nginx/html/