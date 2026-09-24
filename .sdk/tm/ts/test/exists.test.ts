
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RepresentOfficialsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = RepresentOfficialsSDK.test()
    equal(testsdk instanceof RepresentOfficialsSDK, true,
      'RepresentOfficialsSDK.test() must return a client synchronously')
  })

})
