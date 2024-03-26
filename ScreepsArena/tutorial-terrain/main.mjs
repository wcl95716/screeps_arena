// 导入必要的模块和常量
import { getObjectsByPrototype } from 'game/utils'; // 导入从游戏工具模块中获取对象的函数
import { Creep, Flag } from 'game/prototypes'; // 导入 Creep 和 Flag 游戏对象原型

// 游戏主循环函数
export function loop() {
    // 获取所有属于自己的 Creep 对象
    var creeps = getObjectsByPrototype(Creep).filter(i => i.my);
    // 获取所有 Flag 对象
    var flags = getObjectsByPrototype(Flag);
    
    // 遍历所有自己的 Creep 对象
    for(var creep of creeps) {
        // 找到距离当前 Creep 最近的 Flag 对象
        var flag = creep.findClosestByPath(flags);
        // 移动当前 Creep 到最近的 Flag 位置
        creep.moveTo(flag);
    }
}
