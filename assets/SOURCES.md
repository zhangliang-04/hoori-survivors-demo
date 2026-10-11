# 素材来源

官方角色素材 © YUZUSOFT / JUNOS inc.，版权归原权利人所有。本地同人机制Demo不表示获得了再分发或商业授权；若公开发布，请确认相关许可，或替换为有授权的SD素材。以下PNG保持下载原文件，显示裁切仅发生在CSS／Phaser纹理帧中。

| 本地文件 | 角色 | 来源 |
|---|---|---|
| ayase.png | 三司绫濑 | https://www.yuzu-soft.com/products/riddle/images/character/chara01/cos01.png |
| nanami.png | 在原七海 | https://www.yuzu-soft.com/products/riddle/images/character/chara02/cos01.png |
| murasame.png | 丛雨 | https://www.yuzu-soft.com/products/senren/images/chara/chara03/cos01.png （用户提供） |
| yoshino.png | 朝武芳乃 | https://www.yuzu-soft.com/products/senren/images/chara/chara01/cos01.png |
| nene.png | 绫地宁宁（魔女服） | https://www.yuzu-soft.com/products/sothewitch/images/character/main_chara01_pic01.png |

绫濑／七海角色页：https://www.yuzu-soft.com/products/riddle/character.html

丛雨／芳乃角色页：https://www.yuzu-soft.com/products/senren/chara.html

怪物、石地、鸟居、树木、灯笼、SVG技能图标、粒子与攻击轨迹由项目代码绘制，无其他外部贴图依赖。音效为Web Audio合成，未使用原作配音或音乐。字体使用系统字体，无外部字体请求。

剧情动图 `stories/ayase-blackhole.gif` 由用户提供的 `Recording 2026-09-29 001339.gif` 按时间截取而来，保留前73帧（2.92秒），删除持续白屏及其后的内容；未修改原文件。处理方式见 `docs/NARRATIVE.md`。

## 宁宁起爆器

`props/nene-detonator.png`：用户于 2026-10-12 确认采用的起爆器素材，1430×1100 RGBA PNG。参考《魔女的夜宴》Chapter 3-6 地上道具画面，来源为[视频约 00:10](https://www.bilibili.com/video/BV1EGsdezENf/?t=10)。从截图裁出 52×40 区域后，通过内置 imagegen 增强并去除背景；属于 AI 辅助修复素材，不是官方高清原图。原作图像版权归相应权利人所有。

本地制作记录：`art/references/nene/detonator-enhanced-transparent.md`；确认稿：`art/references/nene/detonator-enhanced-transparent.png`。正式素材与确认稿字节一致，用于宁宁起爆器的部署和地面显示。

## 桌角道具

`props/nene-table-corner.png`：用户于2026-10-12确认的独立木质桌角道具，1254×1254 RGBA PNG，由内置imagegen绘制并迭代为三角桌面、短桌腿和清水水渍。不是原作或同人插画的截取素材。与本地确认稿 `art/references/nene/table/table-corner-concept-v4.png` 字节一致；完整生成提示词见同目录 `table-corner-concept-v4.txt`。
