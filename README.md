# Web programming final project

## Structure
- Write/Create event: 每格要存date & time, boolean 表示 available/not
- Show event: 每格要存date & time, available的人數, available的人 (array)
- Homepage: database的event schema要存event name, creators name, number of participants, event id, 參加者是否有write過(array)
    - 有write: go to show event
    - not: go to write/create event
- User schema: name, 目前有的(create/join的)events

## 備註
- 不能直接進到homepage之類的頁面，一定要先登入