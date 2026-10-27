# 运行素材与来源

角色及原作图像 © YUZUSOFT / JUNOS inc.；其他素材按下表记录来源。角色外观和裁切统一配置在 `src/content/appearances.ts`，技能图标入口为 `src/ui/icons.ts`。

## 角色立绘

| 运行文件                  | 原始文件          | 来源                                                                                                        |
| ------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `ayase.png`               | 同名              | [绫濑官方图片](https://www.yuzu-soft.com/products/riddle/images/character/chara01/cos01.png)                |
| `nanami.png`              | 同名              | [七海官方图片](https://www.yuzu-soft.com/products/riddle/images/character/chara02/cos01.png)                |
| `murasame.png`            | 同名              | [丛雨官方图片](https://www.yuzu-soft.com/products/senren/images/chara/chara03/cos01.png)                    |
| `nene-no-halo.png`        | `nene.png`        | [宁宁魔女服官方图片](https://www.yuzu-soft.com/products/sothewitch/images/character/main_chara01_pic01.png) |
| `nene-school-no-halo.png` | `nene-school.png` | [宁宁校服官方图片](https://www.yuzu-soft.com/products/sothewitch/images/character/main_chara01_pic02.png)   |
| `meguru-no-halo.png`      | `meguru.png`      | [巡官方图片](https://www.yuzu-soft.com/products/sothewitch/images/character/main_chara02_pic01.png)         |
| `nanao.jpg`               | 同名              | [相马七绪官方人物图](https://www.yuzu-soft.com/products/sothewitch/images/character/sub_chara_bg02.jpg)     |

另保留 `yoshino.png`，来源为 [芳乃官方图片](https://www.yuzu-soft.com/products/senren/images/chara/chara01/cos01.png)。七绪图片含背景与两处人物构图，使用配置的帧和头像裁切。

宁宁与巡的运行PNG由 `scripts/remove-portrait-halo.cjs` 处理原始透明通道：保持1000×750画布、全部RGB及不透明像素，清除半透明近白色光晕。脚本依赖 `sharp`，可通过 `HOORI_SHARP_MODULE` 指定已有模块路径；不属于运行时依赖。

## 剧情媒体

| 文件                                                         | 来源／处理                                                                                                                                                                        |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stories/ayase-shield-panic.webp`、`ayase-shield-angry.webp` | 用户提供的破盾剧情配图，转换为WebP                                                                                                                                                |
| `stories/ayase-blackhole.mp4`                                | 用户提供的 `Recording 2026-09-29 001339.gif` 中黑洞演出片段，转换为视频                                                                                                           |
| `stories/nanami-dumpling-fast.webm`                          | 用户提供的 `nanami_dumpling.gif`，加速转换为循环演出视频                                                                                                                          |
| `stories/meguru-poyayan.webp`                                | [原作SD截图整理](https://www.bilibili.com/opus/721254309166055472) 中的 [图片](https://i0.hdslb.com/bfs/article/8ec835dc7528f903acf51b698060c641202d6bae.png)，保留尺寸转换为WebP |

实际引用以源码仓库的 `src/content/stories.ts` 为准，循环、推进和异步加载由 `src/ui/narrative-view.ts`、`src/ui/story-media.ts` 管理。

## 道具与技能图标

- `props/nene-detonator.png`：1430×1100透明PNG，基于 [原作切片约00:10](https://www.bilibili.com/video/BV1EGsdezENf/?t=10) 的起爆器画面，经AI辅助放大与透明处理。用于部署、地面装置和爆炸前表现。
- `props/nene-table-corner.png`：1254×1254透明PNG，AI生成的木质桌角道具，用于持续水渍技能。
- `props/meguru-poyayan.webp`：1254×1254透明图，由上述巡SD截图经AI辅助抠图获得。保留可见发型、表情与上半身，技能图标和发动演出共用。
- 起爆器图标使用 `art/references/nene/detonator-skill-icon-original.svg`；其他矢量图标由 `src/ui/icons.ts` 定义。

## 战斗演出与语音

| 文件                             | 来源与用途                                                                                                                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `cameos/nanami-dumpling.webp`    | 从上述打饺视频截取七海所在左侧画面，逐帧轮廓裁切，保留七海、擀面杖和案板；10帧透明横向图集（每帧380×462），战斗出手时循环显示                                                                                                                                                  |
| `cameos/nene-secret-weapon.webp` | [起爆器掉落原作片段](https://www.bilibili.com/video/BV1EGsdezENf/)约00:10的SD宁宁，手工描边透明裁切；部署秘密武器时显示                                                                                                              |
| `cameos/ayase-unmasked.webp`     | 从已有破盾生气图片裁切脸部；破盾强化时短暂显示                                                                                                                                                                                       |
| `voices/meguru-ciallo.mp3`       | [bestZwei/ciallo-de 的流传语音素材](https://github.com/bestZwei/ciallo-de/blob/master/public/meguru.aac)，约1.2秒的Ciallo；AAC转单声道64kbps MP3。识别到的内容为Ciallo招呼；仓库未给出原作语音文件编号，因此不标注为已核实的解包原档 |

图片处理脚本为 `scripts/prepare-combat-cameos.py`，保留原画像素与人物比例，不重绘；运行需要Pillow、FFmpeg及本地 `art/references/nene/drop-10s.png` 原帧。语音与原作图像权利仍属于相应权利人。`voices/murasame-kagome.mp3` 截自[好姐妹梨安整理的丛雨《笼中鸟》字幕片段](https://www.bilibili.com/video/BV1aG4y1k7ux/)00:00–00:06.35，结尾0.25秒淡出、单声道64kbps；00:02画面对应“かごめ かごめ”，`cameos/murasame-song.webp` 取该帧(390,45)–(640,240)的SD区域。字幕和角色画面已核对，属于原作切片来源，未取得原作语音文件编号。

怪物、地形装饰、粒子与其余攻击轨迹由代码绘制；打击音效由Web Audio合成，字体采用系统字体。

七海「治愈之风」语音：
- 文件：`voices/nanami-healing-wind.mp3`；来源：[用户指定的原声片段](https://www.bilibili.com/video/BV1BS4y187YJ/)，12:26.5–12:28.6，约2.1秒。
- FFmpeg处理：80Hz高通、`afftdn=nr=6:nf=-40:tn=1`轻度降噪、末尾60ms淡出，单声道44.1kHz／128kbps MP3。当前为视频音轨切片，取得解包原声后可替换同名资源。

## 素材维护

保留原始文件及来源。清理现有立绘时保持人物像素和比例，使用裁切或透明通道处理；替换素材后同时检查首页、头像、剧情和战斗的显示框。运行资产放在 `public/assets/`；研究稿、截图与制作中间文件放在 `art/`。

`stories/nanami-dumpling-cutout.webm` 与战斗图集使用相同透明帧，50fps循环；由 `scripts/prepare-nanami-dumpling.py` 从原视频生成。各姿势共用固定画布，拍案文字覆盖处使用同姿势的干净原帧，保留原画像素与比例。
