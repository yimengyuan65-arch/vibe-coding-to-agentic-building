# Hex 风格文章站品牌规格

视觉基于 Hex 当前首页与工作区既有 Hex 项目资源：纸白背景、近黑紫墨色、粉红提示色、细密网格，以及编辑型衬线与紧凑无衬线的对照。

```css
:root {
  --bg: oklch(0.985 0.002 250);
  --surface: oklch(0.998 0 0);
  --fg: oklch(0.22 0.025 315);
  --muted: oklch(0.50 0.018 315);
  --border: oklch(0.86 0.009 330);
  --accent: oklch(0.78 0.072 8);
}
```

- Display：`PP Formula SemiExtended`, `PingFang SC`, `Noto Sans CJK SC`, sans-serif
- Body：`Cinetype`, `PingFang SC`, `Noto Sans CJK SC`, sans-serif
- Editorial：`PP Editorial New`, `PingFang SC`, `Noto Sans CJK SC`, sans-serif
- Mono：`Cinetype Mono`, `SFMono-Regular`, `Menlo`, `PingFang SC`, monospace

观察到的视觉规则：

1. 页面以纸白和近黑紫为主，彩色只用于短标签、进度和少量强调。
2. 背景叠加低对比纸纹与 4px 微点阵，构成印刷质感而非装饰图案。
3. 大标题使用紧字距无衬线；拉丁短语保留编辑型字体或斜体，中文统一使用 PingFang SC。
4. 内容由细线网格、无圆角区块和跨栏排版组织；正文保持统一阅读字号，卡片标题收敛到 20px 层级，阴影只用于浮层。
5. 技术内容使用等宽标签、代码板和流程节点，与长文正文形成密度变化。
