---
title: 使用OpenCode放空大脑初体验
published: 2026-06-28
tags: [Code,Blogging,AI,MCP,Ghidra]
category: AI
draft: false
---
> 正则首次体验DeepSeek V4 Pro Max！被吓到**眩晕瘫坐**，那一刻就像看见原子弹爆炸。

事情的起因是我在玩[Kaeru](https://github.com/R0rt1z2/kaeru)的时候需要对`lk.img`进行反编译，而面对这一坨一坨的反汇编代码，在经历过自己用一整个下午才勉强做好适配之后，我开始思考能不能由AI代劳。一段时间之后，我在群里询问群U，群U的建议是使用[OpenCode](https://opencode.ai/)，用`MCP`连接`Ghidra`

### 上手使用
安装没有什么好说的，直接按照[Wiki](https://opencode.ai/docs/zh-cn/)部署即可。我为了省事选择了安装`OpenCode 桌面版 （Beta）`

初次上手桌面端可能会有些不适应。由于我们是在本地跑项目，服务器在哪暂时无所谓，local即可，但是不要直接打开根目录，在主页选择打开项目，进入到你的工作文件夹。运行时，AI可以访问工作文件夹内的所有文件。

:::tip
除了拥有读写权限外AI还可以操作本机bash，因此它可以直接帮你运行脚本/编译测试。
:::

OpenCode提供了`Plan`，`Build`两个主Proxy，前者是Read-Only，后者是Writable。Plan模式下AI进行计划而不可改动，Build模式可以直接改动。如果遇到简单的小问题可以直接Build，但是如果问题复杂则应当使用Plan。主Proxy之外还有`General`、`Explore` 和 `Scout`三个子代理。子代理由主代理调用，无法在其中输入Prompt，只为完成一项任务而运行。

对话时，右侧可以显示此次会话的开销。

点击左下角齿轮图标，进入设置，找到`提供商`，连接你所需要的并填入API-Key即可连接服务商，我使用的是`DeepSeek V4 Pro`，便宜管饱型，实际上一般任务免费模型`MiMo V2.5 Free`也够用

### MCP 配置
:::Note
以防你找不到配置文件，这是它的位置：`C:\Users\${Username}\.config\opencode\opencode.jsonc`
:::
#### Ghidra
Ghidra可以利用[Ghidra MCP](https://github.com/LaurieWired/GhidraMCP)，最佳`Ghidra-version=1.3.2`

::github{repo="LaurieWired/GhidraMCP"}

将release解压，先在Ghidra主页面`Install Extensions`安装`GhidraMCP-1.4`，确认安装好之后启用`Developer`。紧接着，我们打开OpenCode配置文件，输入：
```json
    "mcp": {
        "ghidra": {
        "type": "remote",
        "url": "http://127.0.0.1:8081/sse",
        "enabled": true
        }
    }
```
在确认自己Ghidra启动的情况下，运行
```shell
python bridge_mcp_ghidra.py --transport sse --mcp-host 127.0.0.1 --mcp-port 8081 --ghidra-server http://127.0.0.1:8080/
```
重启OpenCode，不出意外的话，你应该可以看到OGhidra可用
#### Docs
有时候我们希望AI对接API文档，这时候可以使[kapa.ai](kapa.ai)创建MCP。
我们以此博客的框架`Astro`为例，
> Name: Astro Docs
> URL: https://mcp.docs.astro.build/mcp
> Transport: Streamable HTTP
因此只需要在配置文件里输入
```json
"AstroDocs":{
      "type": "remote",
      "url": "https://mcp.docs.astro.build/mcp",
      "enabled": true
    },
```
重启客户端即可

:::note
以上都是remote MCP的简单配置，更复杂的情况请参考[https://opencode.ai/docs/zh-cn/mcp-servers/](https://opencode.ai/docs/zh-cn/mcp-servers/)
:::

至此，已可以粗略上手OpenCode的使用并配置恰当的MCP来实现需求。不管怎么说，能让一位黑奴按照自己想法干活还是一件很爽的事情的（x）