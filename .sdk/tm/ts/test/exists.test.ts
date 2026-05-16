
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RepresentOfficialsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await RepresentOfficialsSDK.test()
    equal(null !== testsdk, true)
  })

})
