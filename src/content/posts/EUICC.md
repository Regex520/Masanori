---
title: 关于EUICC——从零开始的eSIM生活
published: 2025-08-20
tags: [eSIM, EUICC, 教程]
category: 教程
draft: false
---

:::important
我的RedteaGO邀请码：[REGE0014](http://app.redteago.com/invite/index.html?id=REGE0014)

点击以注册并获得3USD余额
:::

> 大概是一年前在接触类原生时偶然注意到了一个叫做OpenEUICC的系统软件，怀着好奇打开后开启了对EUICC的探索。。。

## 前言

传统的SIM卡具有以下问题：

1. 使用较繁琐，需要拆卸卡槽安装卡片装回卡槽，要换卡非常繁琐
2. 物流时间长，无论是通过邮寄的卡片还是营业厅激活，从办理到使用所需要的时间都较长
3. 难以跨国支持，想要购买到境外的实体SIM卡需要非常繁琐的途径
4. 反复拆卸可能导致卡片失效损坏，且取出后容易丢失

总而言之，问题在于 **难以管理**

为了解决这个问题，eUICC和eSIM技术应运而生，然而遗憾的是，由于一些*不可抗力*因素，绝大多数中国大陆生产的手机均不支持此功能。本文将介绍如何通过后天补全的方式获得esim功能，加以我个人理解的重点知识。

:::note
即使市面上已经存在很多成熟的euicc芯片类实体卡片成品，我也希望这篇文章能补全你的知识漏洞，用的明白
:::

## 什么是eSIM

> eSIM，又名嵌入式SIM（embedded-SIM），是一种直接嵌入设备（焊接在PCB板上）的可编程SIM卡 ——《Wikipedia》

传统的SIM卡需要将SIM卡插入卡槽，利用OMAPI通道与芯片上的UICC芯片交互提供网络功能。而嵌入式的SIM卡直接将SIM卡数据写入嵌入的芯片（**eUICC，嵌入式UICC芯片**），通过与该芯片通信以实现上网。

这两种方式的最主要区别在于：**芯片是否可写**

事实上，要想访问eUICC芯片并不需要让他成为主板的一部分。通过OMAPI/TMAPI接口访问SIM卡上的安全元件，并打开同样可以与eUICC芯片交互，这为我们将eSIM通过实体卡槽实现提供可能性。

## 可插拔eSIM是如何工作的

:::important
本文章重点针对安卓，读卡器无需在意授权问题，苹果无脑eSTK不然你也用不了
:::

### 基本信息

每颗eUICC芯片都有其唯一的id，称为 `EID`。芯片上同时拥有来自GSMA CI为其制作商颁发的证书。此证书作用很大，可以验证eUICC芯片的合法性，为写入eSIM数据与基站交互提供基础。因此，没有合适的证书，就没法运行对应的卡片。

你可以在 [eUICC Manual](https://euicc-manual.osmocom.org/docs/pki/ci/) 查询CI信息。

:::warning
GSMA特别准许中国大陆自行选择CI，由于证书不互通。你所购买到的eUICC卡片大多不支持中国卡，请在购买前核实。三大运营商交叉信任的互相的CI，如果能买到**支持其中一家**或**具有根证书**的卡片则支持三大运营商
:::

### 如何交互

在你的安卓手机上，与eUICC芯片的交互是通过OMAPI管理ISD-R通道实现的。管理eSIM的软件被称为**LPA**。

#### OMAPI LPA

每颗eUICC芯片上都具有一个 `ARA-M` 字段，标记了信任的LPA的sha-1值。例如，如果EasyEUICC这一LPA希望与插入的eUICC通信，已知EasyEUICC的sha-1为 `2A2FA878BC7C3354C2CF82935A5945A3EDAE4AFA`。因此你需要确定ARA-M里有此值，否则你将无法管理。对应的，假如你选择的插槽支持OMAPI，卡片里有写入EasyEUICC的sha-1，你将能够使用该LPA进行管理。

#### TMAPI LPA

有时候，你所购买的可插拔eSIM卡片并不一定有写入ARA-M字段，你就必须使用另一级别权限：`TMAPI`，特权API。（适用于ROM开发者或刷机用户）。其原理在于，作为系统应用的LPA具有忽略ARA-M的能力，强制管理eUICC，因此将系统LPA安装到系统应用中即可管理。

此级别权限适用于，拆机焊接获得的可插拔eSIM卡（拆机iPhone手机），野鸡厂商生产的卡片，以及你不喜欢原厂LPA的卡片。

#### 写卡器

这东西我也没用过，有需要建议自行了解（我会补的）

如果实在不支持，你也可以试着用支持的设备写好后插入

### 让我们实际操作一下。

#### 准备工作

首先介绍一个项目：Easy/OpenEUICC

::github{repo="estkme-group/openeuicc"}

你可以在此存储库下载EasyEUICC，这是非系统应用，调用OMAPI的实现。

如果你想使用TMAPI，请刷入 `OpenEUICC For Magisk`

::github{repo="hzy132/OpenEUICC_for_Magisk"}

完成后，对于Easy，请插一张卡进行兼容性检查，Slot1不行就试试Slot2.

应当显示：（图片待上传）

购买eUICC芯片并插入，打开LPA即可管理。

#### 添加卡片——以RedteaGo为例：

注册账号，填我邀请码获得3$余额

:::tip
Hey, have you tried an eSIM? Get $3 credits from RedteaGO. Use code REGE0014 when you sign up or apple it at checkout.

Referral link: http://app.redteago.com/invite/index.html?id=REGE0014
:::

:::warning
此步骤必须使用电脑，原生不支持eSIM的手机无法完成添加操作。
:::

注册后在主页选择心仪的套餐，支付完成截图如下

下一步，看到页面显示如下，点击 `Download QRCode`

打开OpenEUICC，扫描二维码添加卡片

激活卡片，享受你的eSIM吧！
