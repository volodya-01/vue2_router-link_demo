const Mock = require('mockjs')

const resdata = {
  'data|96': [{
    'now': '@NOW',
     'float5': '@FLOAT(1000, 2000, 0,3)',
  }]
}
const resdata2 =  {
  'data|96': [{
    'now': '@NOW',
     'float5': '@FLOAT(10, 200, 0,3)',
  }]
}
Mock.setup({
  timeout: 400
})
Mock.mock("/volodya/resdata", "post", resdata)
Mock.mock("/volodya/resdata2", "post", resdata2)

