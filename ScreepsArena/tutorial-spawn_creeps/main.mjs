// 导入必要的模块和常量
import { getObjectsByPrototype } from 'game/utils'; // 从游戏工具模块中导入获取对象的函数
import { Creep, Flag, StructureSpawn } from 'game/prototypes'; // 导入 Creep、Flag 和 StructureSpawn 游戏对象原型
import { MOVE } from 'game/constants'; // 导入 MOVE 常量


// 定义全局变量 creep1 和 creep2，用于存储生成的 Creep 对象
var creep1, creep2;

// 游戏主循环函数
export function loop() {
    // 获取第一个 StructureSpawn 对象
    var mySpawn = getObjectsByPrototype(StructureSpawn)[0];
    // 获取所有 Flag 对象
    var flags = getObjectsByPrototype(Flag);

    // 如果 creep1 不存在（未生成）
    if (!creep1) {
        // 通过 mySpawn 生成一个 Creep 对象，并将其赋值给 creep1
        creep1 = mySpawn.spawnCreep([MOVE]).object;
    } else {
        // 将 creep1 移动到第一个 Flag 的位置
        creep1.moveTo(flags[0]);

        // 如果 creep2 不存在（未生成）
        if (!creep2) {
            // 通过 mySpawn 生成一个 Creep 对象，并将其赋值给 creep2
            creep2 = mySpawn.spawnCreep([MOVE]).object;
        } else {
            // 将 creep2 移动到第二个 Flag 的位置
            creep2.moveTo(flags[1]);
        }
    }
}
