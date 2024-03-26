// 导入必要的模块和常量
import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from 'game/constants'; // 导入游戏常量模块中的资源能量常量和错误常量
import * as utils from 'game/utils'; // 导入游戏实用工具模块中的所有函数
import * as prototypes from 'game/prototypes'; // 导入游戏对象原型模块中的所有对象原型

// 游戏主循环函数
export function loop() {
    // 获取一个属于自己的 Creep 对象
    const creep = utils.getObjectsByPrototype(prototypes.Creep).find(i => i.my);

    // 如果 creep 的能量存储为空
    if (!creep.store[RESOURCE_ENERGY]) {
        // 获取距离 creep 最近的一个 StructureContainer 对象
        const container = utils.findClosestByPath(creep, utils.getObjectsByPrototype(prototypes.StructureContainer));
        // 尝试从 container 中提取能量
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            // 如果不在提取范围内，则移动到 container 的位置
            creep.moveTo(container);
        }
    } else {
        // 获取距离 creep 最近的一个 ConstructionSite 对象
        const constructionSite = utils.getObjectsByPrototype(prototypes.ConstructionSite).find(i => i.my);
        // 如果没有 constructionSite
        if (!constructionSite) {
            // 在位置 {x:50,y:55} 创建一个 StructureTower
            utils.createConstructionSite({ x: 50, y: 55 }, prototypes.StructureTower);
        } else {
            // 尝试对 constructionSite 进行建造
            if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                // 如果不在建造范围内，则移动到 constructionSite 的位置
                creep.moveTo(constructionSite);
            }
        }
    }
}
