# 资源导航站（自动更新）

基于夸克资源发布技能（`quark-resource-publisher`）自动生成的静态资源导航站，部署在 GitHub Pages。

## 如何更新

每次发布新资源后，技能会自动运行 `build_site.py` 重新生成本站并推送。无需手动维护。

也可以手动重建：

```powershell
python <技能目录>/scripts/build_site.py
# 然后提交推送
git add -A && git commit -m "site: update" && git push origin main
```

## 页面结构

- `index.html` — 首页（Hero + 分类 + 最新资源 + 广告位）
- `category/<分类>.html` — 各分类页
- `month/<YYYYMM>.html` — 月度聚合页
- `assets/` — 样式与脚本
- `_ad_slots/` — **广告位内容**（可编辑，重建时保留）

## 广告位配置

站点预留了 3 个广告位，编辑对应文件后刷新页面即生效（重建站点不会覆盖）：

| 广告位 | 文件 | 位置 |
|---|---|---|
| 顶部横幅 | `_ad_slots/top-banner.html` | 首页 Hero 下方 |
| 信息流 | `_ad_slots/in-feed.html` | 首页每 6 张资源卡片之间 |
| 底部横幅 | `_ad_slots/bottom-banner.html` | 首页页脚上方 |

把广告代码（如 Google AdSense / 其他联盟）粘贴进对应文件即可，替换掉占位提示。

## 声明

资源均来自网络分享，仅供学习交流使用，请于下载后 24 小时内删除。
