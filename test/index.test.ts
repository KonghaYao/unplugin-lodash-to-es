import {test} from 'vitest'
import fs from 'fs'

test("测试 lodash default ",()=>{
    build({
        plugins:[LodashToEs()]
    })
})