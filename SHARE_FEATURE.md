# 分享功能说明

## 新增功能

在游戏结束弹窗中添加了社交分享功能，让玩家可以轻松分享自己的成绩。

### 功能清单

1. **显示全球排名**
   - 在游戏结束弹窗中显示玩家的全球排名
   - 支持10种语言的排名显示格式

2. **分享到 X (Twitter)**
   - 一键打开 Twitter 分享窗口
   - 自动生成包含分数和排名的分享文案
   - 自动附带网站链接

3. **复制分享文案**
   - 一键复制分享文案到剪贴板
   - 复制成功后有视觉反馈（按钮变绿，显示"已复制！"）
   - 2秒后自动恢复原状态

### 分享文案模板

#### 中文 (zh-CN)
```
我在 Block Blast 获得了 {score} 分，全球排名 {rank}！你能超越我吗？🎮

https://block-blast.io/
```

#### English (en)
```
I scored {score} points on Block Blast, ranked {rank} globally! Can you beat me? 🎮

https://block-blast.io/
```

#### 其他语言
- 西班牙语 (es)
- 法语 (fr)
- 德语 (de)
- 日语 (ja)
- 韩语 (ko)
- 葡萄牙语 (pt)
- 俄语 (ru)
- 阿拉伯语 (ar)

### UI 设计

#### 游戏结束弹窗结构
```
┌─────────────────────────────────┐
│      游戏结束！                   │
│                                 │
│   最终分数: 1234                 │
│   全球排名: #12,345              │
│                                 │
│  ┌────────┐   ┌────────┐        │
│  │分享到X │   │复制文案│        │
│  └────────┘   └────────┘        │
│                                 │
│      [再来一局]                  │
└─────────────────────────────────┘
```

#### 按钮样式
- **Twitter 按钮**: Twitter蓝色 (#1DA1F2)，带 X 图标
- **复制按钮**: 蓝色边框，点击后变绿色
- 响应式设计：移动端按钮堆叠显示

### 技术实现

#### 文件修改
1. **index.html**
   - 添加排名显示元素
   - 添加两个分享按钮
   - 添加 SVG 图标

2. **styles.css**
   - 添加 `.rank-display` 样式
   - 添加 `.share-buttons` 容器样式
   - 添加 `.btn-share`, `.btn-twitter`, `.btn-copy` 按钮样式
   - 添加 `.btn-copy.copied` 复制成功样式
   - 添加移动端响应式样式

3. **game.js**
   - 在 `translations` 中添加分享相关文案
   - 新增 `calculateCurrentRank()` - 计算当前分数的全球排名
   - 新增 `generateShareText()` - 生成多语言分享文案
   - 新增 `shareToTwitter()` - 打开 Twitter 分享窗口
   - 新增 `copyShareText()` - 复制文案到剪贴板
   - 修改 `gameOver()` - 显示排名信息
   - 添加事件监听器

### 代码示例

#### 生成分享文案
```javascript
function generateShareText() {
    const rank = calculateCurrentRank();
    const formattedRank = `#${rank.toLocaleString(localeMap[currentLang])}`;
    const shareTemplate = translations[currentLang].shareText;
    
    return shareTemplate
        .replace('{score}', score)
        .replace('{rank}', formattedRank) + '\n\nhttps://block-blast.io/';
}
```

#### Twitter 分享
```javascript
function shareToTwitter() {
    const text = generateShareText();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
}
```

### 用户体验亮点

1. **多语言支持**: 所有文案自动适配当前选择的语言
2. **视觉反馈**: 复制成功时按钮变色并显示提示
3. **响应式设计**: 移动端和桌面端都有良好的显示效果
4. **一键操作**: 无需手动编辑，点击即可分享
5. **自动排名**: 根据实际分数计算全球排名，增加竞争感

### 测试场景

- [x] 游戏结束时显示排名
- [x] 点击 Twitter 按钮打开分享窗口
- [x] 点击复制按钮复制文案
- [x] 复制成功显示反馈
- [x] 多语言文案切换
- [x] 移动端布局适配
- [x] 深色模式下的样式
- [x] RTL 语言（阿拉伯语）适配

### 未来改进方向

1. 添加更多社交平台（Facebook, WhatsApp, Line等）
2. 添加分享成就截图功能
3. 添加分享后奖励（额外游戏币等）
4. 集成社交媒体 API 获取真实分享数据
5. 添加分享统计分析
