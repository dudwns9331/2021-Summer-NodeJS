/* eslint-disable no-console */
// @ts-check

/**
 * 2021/09/06 mongoDB
 */

const { MongoClient } = require('mongodb')

const uri = 'dbUser'

const client = new MongoClient(uri, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function main() {
  // 연결
  await client.connect()

  // DB 생성
  const users = client.db('db1').collection('users')
  const cities = client.db('db1').collection('cities')

  // 항상 실행될 때 데이터베이스를 비워준다.
  await users.deleteMany({})
  await cities.deleteMany({})

  await cities.insertMany([
    {
      name: '서울',
      population: 1000,
    },
    {
      name: '부산',
      population: 350,
    },
  ])

  await users.insertMany([
    {
      name: 'Foo',
      birthYear: 2000,
      contacts: [
        {
          type: 'phone',
          number: '+821000001111',
        },
        {
          type: 'phone',
          number: '+821000001111',
        },
      ],
      city: '서울',
    },
    {
      name: 'Bar',
      birthYear: 1995,
      city: '부산',
    },
    {
      name: 'Baz',
      birthYear: 1990,
      city: '부산 ',
    },
    {
      name: 'Poo',
      birthYear: 1993,
      city: '서울',
    },
  ])

  /** 삭제하는 경우
  await users.deleteOne({
    name: 'Baz',
  })
  */

  /** 업데이트하는 경우
  users.updateOne(
    {
      name: 'Baz',
    },
    {
      $set: {
        name: 'Boo',
      },
    }
  )
   */

  /** 값 조건 줘서 찾기
  const cursor = users.find(
    {
      birthYear: {
        $gte: 1990,
      },
    },
    {
      sort: {
        birthYear: -1,
      },
    }
  )
  */

  /**
  // 중첨된 경우 해당 값을 찾기 위해서 JS 형식으로 찾기도 한다.
  const cursor = users.find({
    'contacts.type': 'phone',
  })
  */

  // 통합하는 방법
  const cursor = users.aggregate([
    {
      $lookup: {
        from: 'cities',
        localField: 'city',
        foreignField: 'name',
        as: 'city_info',
      },
    },
    {
      $match: {
        $or: [
          {
            'city_info.population': {
              $gte: 500,
            },
          },
          {
            birthYear: {
              $gte: 1995,
            },
          },
        ],
      },
    },
    {
      $count: 'num_users',
    },
  ])

  await cursor.forEach(console.log)

  await client.close()
}

main()
