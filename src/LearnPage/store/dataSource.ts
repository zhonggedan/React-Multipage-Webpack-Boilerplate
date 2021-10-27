import {restore, createEvent} from 'effector'

export const changeHashTag = createEvent<string>()
export const $hashTag = restore(changeHashTag, '')


$hashTag.watch(state => {
  console.log('state:', state);
})