// 导入必要的模块和常量
import * as utils from 'game/utils'; // 导入游戏实用工具模块中的所有函数
import * as prototypes from 'game/prototypes'; // 导入游戏对象原型模块中的所有对象原型
import * as constants from 'game/constants'; // 导入游戏常量模块中的所有常量

// 游戏主循环函数
export function loop() {
    // 获取一个属于自己的 Creep 对象
    var creep = utils.getObjectsByPrototype(prototypes.Creep).find(i => i.my);
    // 获取第一个 Source 对象
    var source = utils.getObjectsByPrototype(prototypes.Source)[0];
    // 获取一个属于自己的 StructureSpawn 对象
    var spawn = utils.getObjectsByPrototype(prototypes.StructureSpawn).find(i => i.my);

    // 如果 creep 的能量存储未满
    if (creep.store.getFreeCapacity(constants.RESOURCE_ENERGY)) {
        // 尝试从 source 中采集能量
        if (creep.harvest(source) == constants.ERR_NOT_IN_RANGE) {
            // 如果不在采集范围内，则移动到 source 的位置
            creep.moveTo(source);
        }
    } else {
        // 如果 creep 的能量存储已满
        // 尝试将能量转移到 spawn 中
        if (creep.transfer(spawn, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
            // 如果不在转移范围内，则移动到 spawn 的位置
            creep.moveTo(spawn);
        }
    }
}
