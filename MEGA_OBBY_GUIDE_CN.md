# MEGA OBBY — 完整搭建指南 + Lua 脚本（中文版）
### Roblox Studio — 12 关障碍跑酷地图

> 本中文版在原英文指南基础上，补全了所有"含糊不清"的地方（坐标、间距、命名编号、错开时间、引用对应关系等），让你可以**逐条照抄**就能跑通整张图。
> 阅读约定：所有坐标采用 `(X, Y, Z)` 写法；尺寸采用 `宽 x 高 x 长`；颜色采用 `RGB 0–255`。

---

## 目录
- [第一部分：Roblox Studio 准备工作](#第一部分roblox-studio-准备工作)
- [第二部分：六大区域逐关搭建（含具体坐标）](#第二部分六大区域逐关搭建含具体坐标)
- [第三部分：存档点（Checkpoint）系统](#第三部分存档点checkpoint系统)
- [第四部分：全部 Lua 脚本（带中文注释）](#第四部分全部-lua-脚本带中文注释)
- [第五部分：调试、优化与发布](#第五部分调试优化与发布)
- [附录 A：所有部件命名速查表](#附录-a所有部件命名速查表)
- [附录 B：坐标地图全局示意](#附录-b坐标地图全局示意)

---

## 第一部分：Roblox Studio 准备工作

### 步骤 1 — 新建地图
1. 打开 **Roblox Studio**
2. 点击 **New（新建）→ Baseplate（基础平台）**
3. 顶部菜单：**File → Game Settings → Security**
   - 打开 **Allow HTTP Requests（允许 HTTP 请求）**（部分进阶脚本会用到）
4. 删除自带的 SpawnLocation（我们会自己做出生点）

### 步骤 2 — Workspace 属性设置
在 Explorer 选中 `Workspace`，到 Properties 面板：
- `Gravity` = `196`（默认值，跑酷手感最合适）
- `StreamingEnabled` = `false`（关掉，否则远处部件会被卸载导致出 bug）

### 步骤 3 — 文件夹结构（在 Explorer 里建好）
在 `Workspace` 下右键 → Insert Object → Folder，建出以下结构：
```
Workspace/
├── Map/
│   ├── Zone1_Grassland/
│   ├── Zone2_LavaLake/
│   ├── Zone3_SkyBridge/
│   ├── Zone4_IcePeaks/
│   ├── Zone5_ShadowMaze/
│   └── Zone6_ChaosTower/
├── Checkpoints/
└── Hazards/
```
另外在 `ServerScriptService` 下建一个名为 `CheckpointManager` 的 Script（先空着，后面填代码）；
在 `StarterGui` 下建一个名为 `WinGui` 的 LocalScript；
在 `StarterPlayer → StarterCharacterScripts` 下建一个名为 `ZoneFog` 的 LocalScript。

---

## 第二部分：六大区域逐关搭建（含具体坐标）

> **整体布局思路**：六个区域沿 `+X` 方向一字排开，每个区域大约占 `120 studs` 宽（X 方向）。
> Z 方向都以 `0` 为中心。Y（高度）随关卡递增。

| 区域 | X 范围 | 起始 Y | 结束 Y |
|---|---|---|---|
| Zone 1 草地 | 0 – 120 | 5 | 25 |
| Zone 2 岩浆湖 | 120 – 240 | 25 | 25 |
| Zone 3 天空桥 | 240 – 360 | 80 | 120 |
| Zone 4 冰峰 | 360 – 480 | 60 | 120 |
| Zone 5 暗影迷宫 | 480 – 600 | 30 | 50 |
| Zone 6 混乱塔 | 600 – 720 | 50 | 220 |

---

### ZONE 1 — 草地跳跃区（第 1–2 关）
**目标**：宽阔绿色平台，作为入门教学。

#### 1. 出生平台（SpawnPad）
- Insert `Part`，尺寸 `10, 2, 10`
- 颜色 `RGB(106, 127, 63)`（亮绿色）
- 材质 `Grass`
- 命名 `SpawnPad`
- 勾选 `Anchored`
- 坐标 `Position = (0, 5, 0)`
- 在它内部 Insert `SpawnLocation`，尺寸 `6, 1, 6`，`Neutral = true`

#### 2. 草地平台（Grass1 ～ Grass8）
按下表搭建（每块都勾 `Anchored`，材质 `Grass` 或 `SmoothPlastic`）：

| 名称 | 尺寸 | 位置 (X, Y, Z) | 颜色 |
|---|---|---|---|
| Grass1 | 8, 2, 8 | (15, 7, 0) | 106,127,63 |
| Grass2 | 8, 2, 8 | (24, 10, 2) | 75,151,75 |
| Grass3 | 7, 2, 7 | (34, 13, -2) | 106,127,63 |
| Grass4 | 7, 2, 7 | (45, 16, 0) | 75,151,75 |
| Grass5 | 6, 2, 6 | (56, 18, 3) | 106,127,63 |
| Grass6 | 6, 2, 6 | (68, 20, -3) | 75,151,75 |
| Grass7 | 5, 2, 5 | (80, 22, 0) | 106,127,63 |
| Grass8 | 5, 2, 5 | (92, 25, 0) | 75,151,75 |

> Grass8 末尾接一块 `12, 2, 10` 的中转平台 `Zone1End`，位置 `(108, 25, 0)`，并在上面放 **Checkpoint1**（详见第三部分）。

#### 3. 可选装饰
- 路边放几个 `2, 4, 2` 的棕色圆柱当树桩（颜色 `86, 66, 54`）
- 用 `MeshPart` 加几丛灌木

---

### ZONE 2 — 岩浆湖（第 3–4 关）★ 重点补全 ★
**目标**：在不断移动的小平台上跳过岩浆，到达对岸。

整个 Zone 2 是一个 `120 x 20`（X 方向 × Z 方向）的矩形区域，X 范围 `120 ～ 240`。
Y 高度统一 `25`，与 Zone 1 末尾对齐。

#### 1. 岩浆地面（LavaFloor）
- Insert `Part`，尺寸 `100, 2, 20`
- 颜色 `RGB(255, 89, 0)`（霓虹橙）
- 材质 `Neon`
- 命名 `LavaFloor`
- 勾选 `Anchored`
- 坐标 `Position = (180, 23, 0)`（即在 Zone 2 中央，刚好比"边缘平台"低 2 格，让玩家看起来踩在岩浆里）
- 在它里面 Insert 一个 `Script`，粘贴**脚本 1 — 死亡砖（Kill Brick）**

#### 2. 起点边缘平台（LavaStart）
- 尺寸 `10, 2, 10`
- 颜色 `163, 162, 165`（中灰）
- 材质 `Concrete`
- 命名 `LavaStart`
- 位置 `(125, 25, 0)`
- `Anchored`

#### 3. 终点边缘平台（LavaEnd）
- 尺寸 `10, 2, 10`
- 颜色 `163, 162, 165`
- 命名 `LavaEnd`
- 位置 `(235, 25, 0)`
- `Anchored`

#### 4. 四块移动平台（MovingPlatform1 ~ MovingPlatform4）
按下表逐块创建。**关键：每块都要单独修改脚本里的 `startDelay`，这样它们才不会同步**：

| 名称 | 尺寸 | **初始位置** | 移动方向 | moveDistance | moveTime | **startDelay** |
|---|---|---|---|---|---|---|
| MovingPlatform1 | 6, 2, 6 | (145, 25, -7) | +Z | 14 | 2.5 | 0.0 |
| MovingPlatform2 | 6, 2, 6 | (170, 25, +7) | -Z | 14 | 2.5 | 0.6 |
| MovingPlatform3 | 6, 2, 6 | (195, 25, -7) | +Z | 14 | 2.5 | 1.2 |
| MovingPlatform4 | 6, 2, 6 | (220, 25, +7) | -Z | 14 | 2.5 | 1.8 |

操作步骤（每一块都要做）：
1. Insert `Part`，按表格填尺寸、位置、颜色 `RGB(255, 200, 0)`、材质 `Neon`、`Anchored = true`
2. 重命名为对应的 `MovingPlatform1` 等
3. 在 Part 里面 Insert `Script`，粘贴**脚本 2 — 移动平台**
4. **修改脚本顶部的两个变量**：
   - `local moveDistance = 14`
   - `local startDelay = 0.0`（按表格里的值改：0.0 / 0.6 / 1.2 / 1.8）
5. 如果方向是 `-Z`，把脚本里 `Vector3.new(moveDistance, 0, 0)` 改成 `Vector3.new(0, 0, -moveDistance)`；
   `+Z` 则改成 `Vector3.new(0, 0, moveDistance)`。

> 把这 6 块（LavaFloor + LavaStart + LavaEnd + 4 块移动平台）拖进 `Zone2_LavaLake` 文件夹里管理。

#### 5. Zone 2 末尾 + 第二个存档点
在 LavaEnd 后再接一块 `12, 2, 10` 的平台 `Zone2End`，位置 `(248, 25, 0)`，上面放 **Checkpoint2**。

---

### ZONE 3 — 天空桥（第 5–6 关）
**目标**：高空狭窄的栈桥 + 加速垫。

#### 1. 起升楼梯（StairZone3_1 ~ StairZone3_5）
从 Y=25 上升到 Y=80，五段斜阶梯，每段 `6, 2, 6`，颜色 `163, 162, 165`：

| 名称 | 位置 (X, Y, Z) |
|---|---|
| StairZone3_1 | (260, 36, 0) |
| StairZone3_2 | (270, 47, 0) |
| StairZone3_3 | (278, 58, 0) |
| StairZone3_4 | (284, 69, 0) |
| StairZone3_5 | (290, 80, 0) |

#### 2. 狭窄栈桥（SkyBridge1 ~ SkyBridge4）
- 尺寸 `20, 2, 3`（又长又细）
- 颜色 `163, 162, 165`
- 材质 `SmoothPlastic`
- 每块之间留 **4 studs** 空隙

| 名称 | 位置 |
|---|---|
| SkyBridge1 | (305, 85, 0) |
| SkyBridge2 | (329, 92, 0) |
| SkyBridge3 | (353, 100, 0) |
| SkyBridge4 | (377, 110, 0) |

#### 3. 加速垫（SpeedPad1, SpeedPad2）
- 尺寸 `6, 1, 6`，颜色 `RGB(170, 0, 170)`（霓虹紫），材质 `Neon`，命名 `SpeedPad`，`Anchored`
- 位置：`SpeedPad1 = (319, 86.5, 0)`，`SpeedPad2 = (367, 101.5, 0)`
- 内部 Insert `Script`，粘贴**脚本 3 — 加速垫**

#### 4. 隐形护栏（防止熟练玩家走捷径）
- 在每段栈桥两侧各放一面 `20, 6, 0.5` 的 Part，`Transparency = 1`、`CanCollide = true`
- Z 方向偏移 `±2.5`，避免被玩家看见但能挡住越界

末尾接平台 `Zone3End`，位置 `(395, 120, 0)`，**Checkpoint3** 放上面。

---

### ZONE 4 — 冰峰（第 7–8 关）
**目标**：又滑又会塌的冰平台，加上尖刺陷阱。

#### 1. 冰平台（Ice1 ~ Ice8）
- 颜色 `RGB(196, 232, 250)`（浅蓝）
- 材质 `Ice`（Roblox 内置滑材质，自带打滑！）
- **Ice3、Ice5、Ice7 是会塌的**：里面 Insert `Script`，粘贴**脚本 4 — 塌陷平台**

| 名称 | 尺寸 | 位置 | 会塌？ |
|---|---|---|---|
| Ice1 | 8, 2, 8 | (405, 90, -5) | 否 |
| Ice2 | 7, 2, 7 | (418, 96, 5) | 否 |
| Ice3 | 6, 2, 6 | (430, 100, -5) | **是** |
| Ice4 | 6, 2, 6 | (442, 105, 5) | 否 |
| Ice5 | 5, 2, 5 | (454, 110, -5) | **是** |
| Ice6 | 5, 2, 5 | (462, 115, 5) | 否 |
| Ice7 | 4, 2, 4 | (470, 118, -5) | **是** |
| Ice8 | 4, 2, 4 | (476, 120, 0) | 否 |

#### 2. 尖刺（Spike1 ~ Spike5）
- 用 `Wedge` 或细三角 Part，尺寸 `2, 3, 2`
- 颜色 `196, 232, 250`，材质 `Ice`
- 命名 `Spike`，里面 Insert `Script`，粘贴**脚本 1 — 死亡砖**
- 摆在玩家落点之间的地面 `Y = 60`（玩家如果掉下就被刺死）：
  位置参考 `(410, 60, 0)`、`(425, 60, 0)`、`(440, 60, 0)`、`(455, 60, 0)`、`(470, 60, 0)`

末尾接 `Zone4End`，位置 `(490, 120, 0)`，**Checkpoint4** 放上面。

---

### ZONE 5 — 暗影迷宫（第 9–10 关）
**目标**：浓雾区，地板会消失，还有左右扫的尖刺墙。

#### 1. 雾气
- 推荐：用第四部分**脚本 10 — 区域雾气**，玩家走进迷宫范围才有雾，避免影响整张地图视野
- 区域边界（脚本里的 `SHADOW_ZONE_MIN/MAX`）就用：
  - `Min = (495, 0, -20)`
  - `Max = (590, 200, 20)`

#### 2. 黑紫平台（Shadow1 ~ Shadow8）
- 尺寸 `5, 2, 5`
- 颜色 `RGB(58, 26, 90)`（深紫）
- 材质 `SmoothPlastic`
- 位置沿 X 方向走"之"字形：

| 名称 | 位置 |
|---|---|
| Shadow1 | (502, 50, 0) |
| Shadow2 | (512, 50, 6) |
| Shadow3 | (522, 50, -6) |
| Shadow4 | (532, 50, 0) |
| Shadow5 | (544, 50, 6) |
| Shadow6 | (554, 50, -6) |
| Shadow7 | (566, 50, 0) |
| Shadow8 | (578, 50, 6) |

#### 3. 陷阱地板（TrapDoor1 ~ TrapDoor4）
- 看起来和黑紫平台几乎一样，但颜色稍亮一点：`RGB(80, 40, 110)`
- 尺寸 `5, 2, 5`
- 内部 Insert `Script`，粘贴**脚本 5 — 陷阱地板**

**位置（夹在黑紫平台之间）**：

| 名称 | 位置 |
|---|---|
| TrapDoor1 | (517, 50, 0) |
| TrapDoor2 | (537, 50, 6) |
| TrapDoor3 | (560, 50, -6) |
| TrapDoor4 | (572, 50, 6) |

#### 4. 来回扫动的尖刺墙（SpikeWall1, SpikeWall2）
- 尺寸 `1, 8, 4`
- 颜色 `RGB(130, 0, 0)`（暗红）
- 材质 `Slate`
- 命名 `SpikeWall`，`Anchored`
- 内部 Insert `Script`，粘贴**脚本 7 — 来回尖刺墙**
- 位置：
  - SpikeWall1: `(525, 55, -7)`，左右往返 14 studs
  - SpikeWall2: `(560, 55, +7)`，左右往返 14 studs（脚本里要把 `endPos` 改成 `Vector3.new(0, 0, -moveDistance)` 才是反方向）

末尾接 `Zone5End`，位置 `(595, 50, 0)`，**Checkpoint5** 放上面。

---

### ZONE 6 — 混乱塔（第 11–12 关）
**目标**：垂直螺旋上升，把前面所有机关都用一遍。

#### 1. 塔身布局
- 从 Y=50 螺旋上升到 Y=220（共 18 层左右）
- 每层一块 `8, 2, 8` 的 Part，颜色在红 `255, 80, 80`、黄 `255, 220, 80`、紫 `170, 0, 170` 中循环
- 围绕中心点 `(660, *, 0)` 做半径 `15` 的螺旋：
  - 第 n 块的位置：`(660 + 15 * cos(n * 45°), 50 + n * 9, 15 * sin(n * 45°))`
- 也可以直接用以下脚本一键生成（贴在 **Command Bar** 里跑一次）：

```lua
-- 一键生成混乱塔的螺旋平台（在 Studio 命令栏跑）
local center = Vector3.new(660, 50, 0)
local folder = workspace.Map.Zone6_ChaosTower
for i = 1, 18 do
    local angle = math.rad(i * 45)
    local p = Instance.new("Part")
    p.Size = Vector3.new(8, 2, 8)
    p.Anchored = true
    p.Material = Enum.Material.SmoothPlastic
    p.Position = center + Vector3.new(15 * math.cos(angle), i * 9, 15 * math.sin(angle))
    local palette = {
        Color3.fromRGB(255, 80, 80),
        Color3.fromRGB(255, 220, 80),
        Color3.fromRGB(170, 0, 170),
    }
    p.Color = palette[((i - 1) % 3) + 1]
    p.Name = "Tower" .. i
    p.Parent = folder
end
print("混乱塔生成完成！")
```

#### 2. 旋转平台（RotatingPlatform）
- 在塔中段，位置 `(660, 130, 0)`，尺寸 `14, 1, 14`
- 颜色 `RGB(255, 220, 80)`，材质 `Neon`
- 命名 `RotatingPlatform`
- 内部 Insert `Script`，粘贴**脚本 6 — 旋转平台**

#### 3. 加速垫 ×2
- 同 Zone 3 的设置，分别放在 `(660, 95, 12)` 和 `(660, 175, -12)`

#### 4. 胜利垫（WinPad）
- 尺寸 `10, 1, 10`
- 颜色 `RGB(255, 215, 0)`（金），材质 `Neon`
- 命名 `WinPad`
- 位置 `(660, 222, 0)`
- 内部 Insert `Script`，粘贴**脚本 9 — 胜利垫**

---

## 第三部分：存档点（Checkpoint）系统

### 命名规则（**非常重要**）
存档点必须按顺序命名为 `Checkpoint1`、`Checkpoint2`、… `Checkpoint5`，否则**脚本 8 (Part B)** 里的 `"Checkpoint" .. stage.Value` 找不到对应的 Part。

### 创建步骤
对每个存档点重复以下操作：
1. Insert `Part`，尺寸 `4, 8, 1`
2. 颜色 `RGB(255, 130, 0)`（橙），材质 `Neon`
3. `Anchored = true`，`CanCollide = false`（避免玩家被它挡住）
4. **命名 `CheckpointN`**（N 取 1–5）
5. 拖进 `Workspace/Checkpoints/` 文件夹
6. 在 Part 内部 Insert 一个 `IntValue`，命名 `StageNumber`，`Value = N`
7. 在 Part 内部 Insert 一个 `Script`，粘贴**脚本 8 — Part A**

### 五个存档点的位置
| 名称 | 位置 | 所在关 |
|---|---|---|
| Checkpoint1 | (108, 28, 0) | Zone 1 出口 |
| Checkpoint2 | (248, 28, 0) | Zone 2 出口 |
| Checkpoint3 | (395, 123, 0) | Zone 3 出口 |
| Checkpoint4 | (490, 123, 0) | Zone 4 出口 |
| Checkpoint5 | (595, 53, 0) | Zone 5 出口 |

最后在 `ServerScriptService/CheckpointManager` 里粘贴**脚本 8 — Part B**。

---

## 第四部分：全部 Lua 脚本（带中文注释）

### 脚本 1 — 死亡砖（Kill Brick）
**放在**：任何会让玩家死亡的 Part 内部（岩浆地板、尖刺等）

```lua
-- 死亡砖脚本：玩家碰到这块 Part 就秒死
local part = script.Parent

local function onTouched(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if humanoid then
        humanoid.Health = 0
    end
end

part.Touched:Connect(onTouched)
```

---

### 脚本 2 — 移动平台（岩浆湖用）
**放在**：每块移动平台 Part 内部

> ⚠️ **每块都要单独修改 `startDelay` 和移动方向**，参考 Zone 2 表格。

```lua
-- 移动平台脚本：使用 TweenService 让平台来回移动
local TweenService = game:GetService("TweenService")
local platform = script.Parent

-- ===== 这里按每块平台的需求改 =====
local moveDistance = 14   -- 单次移动距离（studs）
local moveTime = 2.5      -- 单程时间（秒）
local startDelay = 0.0    -- 启动延迟，错开各块的节奏：0 / 0.6 / 1.2 / 1.8
-- 移动方向：默认 +Z；若要 -Z 把下面那行 Vector3 改成 (0, 0, -moveDistance)
local moveAxis = Vector3.new(0, 0, moveDistance)
-- ===============================

local startPos = platform.Position
local endPos = startPos + moveAxis

local tweenInfo = TweenInfo.new(
    moveTime,
    Enum.EasingStyle.Sine,
    Enum.EasingDirection.InOut,
    -1,   -- 无限循环
    true  -- 自动反向
)

task.wait(startDelay)

local tween = TweenService:Create(platform, tweenInfo, {Position = endPos})
tween:Play()
```

---

### 脚本 3 — 加速垫
**放在**：加速垫 Part 内部

```lua
-- 加速垫脚本：短暂提升玩家移动速度
local pad = script.Parent
local speedBoost = 40        -- 提速后的 WalkSpeed（默认 16）
local boostDuration = 3      -- 持续时间（秒）
local cooldowns = {}         -- 防止同一玩家重复触发

local function onTouched(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    local player = game.Players:GetPlayerFromCharacter(character)

    if humanoid and player and not cooldowns[player.UserId] then
        cooldowns[player.UserId] = true
        humanoid.WalkSpeed = speedBoost

        -- 触发时闪烁
        pad.Color = Color3.fromRGB(255, 255, 100)

        task.wait(boostDuration)

        if humanoid and humanoid.Parent then
            humanoid.WalkSpeed = 16
        end

        pad.Color = Color3.fromRGB(170, 0, 170)
        cooldowns[player.UserId] = nil
    end
end

pad.Touched:Connect(onTouched)
```

---

### 脚本 4 — 塌陷平台（冰峰用）
**放在**：会塌的冰平台 Part 内部

```lua
-- 塌陷平台脚本：踩上去先抖动，然后掉下去，几秒后回来
local platform = script.Parent
local crumbleDelay = 0.8     -- 多久后塌
local respawnDelay = 4       -- 多久后恢复
local originalPos = platform.Position
local isCrumbling = false

local function shake()
    for i = 1, 6 do
        platform.CFrame = CFrame.new(
            originalPos + Vector3.new(
                math.random(-2, 2) * 0.1,
                0,
                math.random(-2, 2) * 0.1
            )
        )
        task.wait(0.05)
    end
end

local function onTouched(hit)
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
    if humanoid and not isCrumbling then
        isCrumbling = true

        shake()
        task.wait(crumbleDelay)

        platform.CanCollide = false
        platform.Transparency = 0.8

        task.wait(respawnDelay)

        platform.CFrame = CFrame.new(originalPos)
        platform.CanCollide = true
        platform.Transparency = 0
        isCrumbling = false
    end
end

platform.Touched:Connect(onTouched)
```

---

### 脚本 5 — 陷阱地板（暗影迷宫用）
**放在**：陷阱地板 Part 内部

```lua
-- 陷阱地板脚本：踩上去后短暂打开（穿透），让玩家掉下去
local door = script.Parent
local openDelay = 0.4
local closeDelay = 2
local isOpen = false

local function onTouched(hit)
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
    if humanoid and not isOpen then
        isOpen = true
        task.wait(openDelay)

        door.CanCollide = false
        door.Transparency = 0.7

        task.wait(closeDelay)

        door.CanCollide = true
        door.Transparency = 0
        isOpen = false
    end
end

door.Touched:Connect(onTouched)
```

---

### 脚本 6 — 旋转平台（混乱塔用）
**放在**：旋转平台 Part 内部

```lua
-- 旋转平台脚本：沿 Y 轴匀速旋转
local platform = script.Parent
local rotationSpeed = 60    -- 度/秒，越大越快

game:GetService("RunService").Heartbeat:Connect(function(dt)
    platform.CFrame = platform.CFrame * CFrame.Angles(0, math.rad(rotationSpeed * dt), 0)
end)
```

---

### 脚本 7 — 来回尖刺墙（暗影迷宫用）
**放在**：尖刺墙 Part 内部

```lua
-- 来回尖刺墙脚本：像闸门一样左右扫，碰到秒杀
local TweenService = game:GetService("TweenService")
local spike = script.Parent
local moveDistance = 14
local moveTime = 1.8

-- 默认沿 +Z 方向移动；如果要反方向，把下面的 Vector3 第三个参数改成 -moveDistance
local startPos = spike.Position
local endPos = startPos + Vector3.new(0, 0, moveDistance)

local tweenInfo = TweenInfo.new(moveTime, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1, true)
local tween = TweenService:Create(spike, tweenInfo, {Position = endPos})
tween:Play()

spike.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
    if humanoid then
        humanoid.Health = 0
    end
end)
```

---

### 脚本 8 — 存档点系统

#### Part A：放进每个 Checkpoint Part 内部
```lua
-- 存档点触发脚本（放进每个 Checkpoint Part 里）
local checkpoint = script.Parent
local stageNumber = checkpoint:FindFirstChild("StageNumber")
if not stageNumber then
    stageNumber = Instance.new("IntValue")
    stageNumber.Name = "StageNumber"
    stageNumber.Parent = checkpoint
end

local activated = {}

checkpoint.Touched:Connect(function(hit)
    local character = hit.Parent
    local player = game.Players:GetPlayerFromCharacter(character)
    if player and not activated[player.UserId] then
        activated[player.UserId] = true

        local leaderstats = player:FindFirstChild("leaderstats")
        if leaderstats then
            local stage = leaderstats:FindFirstChild("Stage")
            if stage and stageNumber.Value > stage.Value then
                stage.Value = stageNumber.Value
            end
        end

        local originalColor = checkpoint.Color
        checkpoint.Color = Color3.fromRGB(255, 255, 0)
        task.wait(0.4)
        checkpoint.Color = originalColor

        task.wait(2)
        activated[player.UserId] = nil
    end
end)
```

#### Part B：放进 `ServerScriptService/CheckpointManager`
```lua
-- 存档点管理器：负责创建 leaderstats 和重生位置
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local stage = Instance.new("IntValue")
    stage.Name = "Stage"
    stage.Value = 0
    stage.Parent = leaderstats

    player.CharacterAdded:Connect(function(character)
        task.wait(0.1)
        local checkpoints = workspace:FindFirstChild("Checkpoints")
        if checkpoints and stage.Value > 0 then
            local targetCheckpoint = checkpoints:FindFirstChild("Checkpoint" .. stage.Value)
            if targetCheckpoint then
                local hrp = character:WaitForChild("HumanoidRootPart")
                hrp.CFrame = targetCheckpoint.CFrame + Vector3.new(0, 5, 0)
            end
        end
    end)
end)
```

---

### 脚本 9 — 胜利垫（WinPad）
**放在**：WinPad Part 内部

```lua
-- 胜利垫脚本：玩家碰到时通过 RemoteEvent 通知客户端显示胜利界面
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- 如果 RemoteEvent 不存在就创建一个
local winEvent = ReplicatedStorage:FindFirstChild("WinEvent")
if not winEvent then
    winEvent = Instance.new("RemoteEvent")
    winEvent.Name = "WinEvent"
    winEvent.Parent = ReplicatedStorage
end

local winPad = script.Parent
local winners = {}

winPad.Touched:Connect(function(hit)
    local character = hit.Parent
    local player = game.Players:GetPlayerFromCharacter(character)
    if player and not winners[player.UserId] then
        winners[player.UserId] = true

        winEvent:FireClient(player)

        task.wait(5)
        winners[player.UserId] = nil
    end
end)
```

#### 胜利界面 LocalScript
**放在**：`StarterGui/WinGui`

```lua
-- 胜利界面 LocalScript
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local winEvent = ReplicatedStorage:WaitForChild("WinEvent")

winEvent.OnClientEvent:Connect(function()
    local screenGui = Instance.new("ScreenGui")
    screenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

    local frame = Instance.new("Frame")
    frame.Size = UDim2.new(0.5, 0, 0.3, 0)
    frame.Position = UDim2.new(0.25, 0, 0.35, 0)
    frame.BackgroundColor3 = Color3.fromRGB(255, 215, 0)
    frame.BorderSizePixel = 0
    frame.Parent = screenGui

    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = frame

    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, 0, 1, 0)
    label.BackgroundTransparency = 1
    label.Text = "胜利！YOU WIN!"
    label.TextColor3 = Color3.fromRGB(80, 40, 0)
    label.TextScaled = true
    label.Font = Enum.Font.GothamBold
    label.Parent = frame

    task.wait(4)
    for i = 1, 20 do
        frame.BackgroundTransparency = i / 20
        label.TextTransparency = i / 20
        task.wait(0.05)
    end
    screenGui:Destroy()
end)
```

---

### 脚本 10 — 区域雾气（暗影迷宫氛围）
**放在**：`StarterPlayer/StarterCharacterScripts/ZoneFog`

```lua
-- 区域雾气脚本：玩家进入暗影迷宫范围时打开浓雾，离开后恢复
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local Lighting = game:GetService("Lighting")

local player = Players.LocalPlayer

-- 暗影迷宫的世界坐标范围（与 Zone 5 的实际位置一致）
local SHADOW_ZONE_MIN = Vector3.new(495, 0, -20)
local SHADOW_ZONE_MAX = Vector3.new(590, 200, 20)

local inFog = false

RunService.Heartbeat:Connect(function()
    local character = player.Character
    if not character then return end
    local hrp = character:FindFirstChild("HumanoidRootPart")
    if not hrp then return end

    local pos = hrp.Position
    local inZone = (
        pos.X >= SHADOW_ZONE_MIN.X and pos.X <= SHADOW_ZONE_MAX.X and
        pos.Y >= SHADOW_ZONE_MIN.Y and pos.Y <= SHADOW_ZONE_MAX.Y and
        pos.Z >= SHADOW_ZONE_MIN.Z and pos.Z <= SHADOW_ZONE_MAX.Z
    )

    if inZone and not inFog then
        inFog = true
        Lighting.FogEnd = 60
        Lighting.FogColor = Color3.fromRGB(20, 10, 30)
        Lighting.Brightness = 0.3
    elseif not inZone and inFog then
        inFog = false
        Lighting.FogEnd = 100000
        Lighting.FogColor = Color3.fromRGB(192, 192, 192)
        Lighting.Brightness = 2
    end
end)
```

---

## 第五部分：调试、优化与发布

### 调试技巧
- 用 **Play Solo（F5）** 单人测试每个区域
- 用 **Move 工具** 微调平台间距：太简单就拉远，太难就拉近
- 每个脚本都亲自走一遍 hazard 测试

### 性能建议
- 总 Part 数控制在 **2000 以下**
- 装饰类部件用 **UnionOperation** 合并
- 所有静态平台都要 `Anchored`，否则会掉下去

### 推荐插件
- **GapFill** — 自动填补 Part 之间的缝隙
- **Stravant's GoodSignals** — 更稳的事件系统
- **Part Resizer** — 批量改尺寸

### 发布
1. File → Publish to Roblox
2. 把游戏设为 **Public**
3. 体裁选 **Obstacle Course**
4. 缩略图：截一张最好看的关卡截图

---

## 附录 A：所有部件命名速查表

| 类型 | 名称 | 数量 | 关键脚本 |
|---|---|---|---|
| 出生 | SpawnPad（内含 SpawnLocation）| 1 | — |
| Zone1 | Grass1 ~ Grass8、Zone1End | 9 | — |
| Zone2 | LavaFloor、LavaStart、LavaEnd、MovingPlatform1~4、Zone2End | 8 | 1, 2 |
| Zone3 | StairZone3_1~5、SkyBridge1~4、SpeedPad×2、Zone3End | 12 | 3 |
| Zone4 | Ice1~8、Spike×5、Zone4End | 14 | 1, 4 |
| Zone5 | Shadow1~8、TrapDoor1~4、SpikeWall1~2、Zone5End | 15 | 5, 7, 10 |
| Zone6 | Tower1~18、RotatingPlatform、SpeedPad×2、WinPad | 22 | 3, 6, 9 |
| 存档点 | Checkpoint1 ~ Checkpoint5 | 5 | 8A |
| 服务端 | CheckpointManager（Script） | 1 | 8B |
| 客户端 | WinGui（LocalScript）、ZoneFog（LocalScript） | 2 | 9, 10 |

---

## 附录 B：坐标地图全局示意

```
Y(高)
220 ┤                                                          ★ WinPad
180 ┤                                                          │
140 ┤                                            ╱╲            │ Zone6
120 ┤                            ──────── Ice8 ─╱  ╲           │ 螺旋塔
 80 ┤                  SkyBridge─                              │
 50 ┤                                              ████████   │
 25 ┤  Grass── LavaStart══════LavaEnd                          │
  5 ┤Spawn                                                     │
    └─────────────────────────────────────────────────────────→ X
       0    120     240     360     480     600     720
        Z1   Z2      Z3      Z4      Z5      Z6
```

---

*中文指南 v1.0 — 基于英文原版 Mega Obby 12-Stage Guide 扩写整理*
