import { getObjectsByPrototype } from 'game/utils';
import { Creep } from 'game/prototypes';
import { ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL } from 'game/constants';

export function loop() {
    // 获取一个敌方单位和所有我方单位
    
    // 获取我方单位
    var myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    // 获取敌方单位
    var enemyCreep = getObjectsByPrototype(Creep).find(creep => !creep.my);

    // 遍历我方单位
    for(var creep of myCreeps) {
        // 如果有攻击部件，就攻击敌方单位  
        // ATTACK: 攻击部件
        if(creep.body.some(bodyPart => bodyPart.type == ATTACK)) {
            // 如果不在攻击范围内，就移动到敌方单位
            if(creep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemyCreep);
            }
        }
        // 如果有远程攻击部件，就远程攻击敌方单位
        if(creep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
            // 如果不在远程攻击范围内，就移动到敌方单位
            if(creep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemyCreep);
            }
        }
        // 如果有治疗部件，就治疗我方单位
        if(creep.body.some(bodyPart => bodyPart.type == HEAL)) {
            // 获取受伤的我方单位
            var myDamagedCreeps = myCreeps.filter(i => i.hits < i.hitsMax);
            // 如果有受伤的我方单位，就治疗
            if(myDamagedCreeps.length > 0) {
                // 如果不在治疗范围内，就移动到受伤的我方单位
                if(creep.heal(myDamagedCreeps[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(myDamagedCreeps[0]);
                }
            }
        }
    }
}