// 导入必要的模块和常量
import utils from "game/utils"; // 实用工具函数
import prototypes from "game/prototypes"; // 游戏对象原型
import constants from "game/constants"; // 游戏常量

// 游戏主循环函数
export function loop() {
    // 获取第一个塔对象
    const tower = utils.getObjectsByPrototype(prototypes.StructureTower)[0];
    // 如果塔的能量储量小于10
    if (tower.store[constants.RESOURCE_ENERGY] < 10) {
        // 获取第一个属于自己的 creep 对象
        var myCreep = utils.getObjectsByPrototype(prototypes.Creep).find(creep => creep.my);
        
        // 如果自己的 creep 的能量储量为0
        if (myCreep.store[constants.RESOURCE_ENERGY] == 0) {
            // 获取第一个容器对象
            var container = utils.getObjectsByPrototype(prototypes.StructureContainer)[0];
            // 从容器中提取能量
            myCreep.withdraw(container, constants.RESOURCE_ENERGY);
        } else {
            // 将能量传输到塔中
            myCreep.transfer(tower, constants.RESOURCE_ENERGY);
        }
    } else {
        // 获取第一个敌方 creep 对象
        var target = utils.getObjectsByPrototype(prototypes.Creep).find(creep => !creep.my);
        // 对敌方 creep 进行攻击
        tower.attack(target);
    }
}
