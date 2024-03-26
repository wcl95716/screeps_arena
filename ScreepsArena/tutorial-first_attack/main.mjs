// 导入必要的模块和常量
import { getObjectsByPrototype } from 'game/utils'; // 导入游戏实用工具模块中的获取对象函数
import { Creep } from 'game/prototypes'; // 导入游戏对象原型模块中的 Creep 对象原型
import { ERR_NOT_IN_RANGE } from 'game/constants'; // 导入游戏常量模块中的错误常量

// 游戏主循环函数
export function loop() {
    // 获取属于自己的 Creep 对象
    var myCreep = getObjectsByPrototype(Creep).find(creep => creep.my);
    // 获取第一个敌方 Creep 对象
    var enemyCreep = getObjectsByPrototype(Creep).find(creep => !creep.my);
    
    // 如果存在自己的 Creep 和敌方 Creep
    if (myCreep && enemyCreep) {
        // 尝试对敌方 Creep 进行攻击
        if (myCreep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
            // 如果不在攻击范围内，则移动到敌方 Creep 的位置
            myCreep.moveTo(enemyCreep);
        }
    }
}
