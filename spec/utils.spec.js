const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns a new array', () => {
    const dates = []
    expect(formatDates(dates)).to.eql([]);
    expect(formatDates(dates)).to.not.equal(dates);
  })
  it('one item in the new array must have its timestamp converted into a Javascript date object', () => {
    //for a comment
    const list = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    }
    ]
    const expected = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: new Date(1501187675733),
    }]
    expect(formatDates(list)).to.eql(expected);
    //for an article
    const list2 = [{
      title: 'Defensive Metrics: Measuring the Intensity of a High Press',
      topic: 'football',
      author: 'tickle122',
      body:
        'In this article, with the use of detailed Opta data, I am going to create a metric that I believe can quantify the extent and aggression of high presses employed by teams, both over a season and in any specific match. I’m going to see if it is possible define the intensity of a press with the use of numbers, more specifically by using some of the events that Opta record. Why would anyone want to do this? Well, for pretty much the same reason that we undertake any analytics study. If we can develop an objective scale which measures the intensity of a press then coaches can quickly see at a glance the strength, or otherwise, of the high pressing that their opposition has utilised in recent games. Teams or fans can also assess how much pressure their team exerted on the opposition in deep positions, and who knows, perhaps in time we will be able to assess the effectiveness that individual players have on the ability of their team to press. In essence we can take what is otherwise a subjective description and reduce it to one number so that it allows for comparison, analysis and ranking, if so desired.',
      created_at: 1485410305946,
    }]
    const expected2 = [{
      title: 'Defensive Metrics: Measuring the Intensity of a High Press',
      topic: 'football',
      author: 'tickle122',
      body:
        'In this article, with the use of detailed Opta data, I am going to create a metric that I believe can quantify the extent and aggression of high presses employed by teams, both over a season and in any specific match. I’m going to see if it is possible define the intensity of a press with the use of numbers, more specifically by using some of the events that Opta record. Why would anyone want to do this? Well, for pretty much the same reason that we undertake any analytics study. If we can develop an objective scale which measures the intensity of a press then coaches can quickly see at a glance the strength, or otherwise, of the high pressing that their opposition has utilised in recent games. Teams or fans can also assess how much pressure their team exerted on the opposition in deep positions, and who knows, perhaps in time we will be able to assess the effectiveness that individual players have on the ability of their team to press. In essence we can take what is otherwise a subjective description and reduce it to one number so that it allows for comparison, analysis and ranking, if so desired.',
      created_at: new Date(1485410305946),
    }]
    expect(formatDates(list2)).to.eql(expected2)
  })
  it('all items in the new array must have its timestamp converted into a Javascript date object', () => {
    //for comments
    const list = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      belongs_to: 'Designing Better JavaScript APIs',
      created_by: 'happyamy2016',
      votes: 15,
      created_at: 1497055662171,
    }
    ]
    const expected = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: new Date(1501187675733),
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      belongs_to: 'Designing Better JavaScript APIs',
      created_by: 'happyamy2016',
      votes: 15,
      created_at: new Date(1497055662171),
    }]
    expect(formatDates(list)).to.eql(expected);
    //for articles
    const list2 = [{
      title: 'Defensive Metrics: Measuring the Intensity of a High Press',
      topic: 'football',
      author: 'tickle122',
      body:
        'In this article, with the use of detailed Opta data, I am going to create a metric that I believe can quantify the extent and aggression of high presses employed by teams, both over a season and in any specific match. I’m going to see if it is possible define the intensity of a press with the use of numbers, more specifically by using some of the events that Opta record. Why would anyone want to do this? Well, for pretty much the same reason that we undertake any analytics study. If we can develop an objective scale which measures the intensity of a press then coaches can quickly see at a glance the strength, or otherwise, of the high pressing that their opposition has utilised in recent games. Teams or fans can also assess how much pressure their team exerted on the opposition in deep positions, and who knows, perhaps in time we will be able to assess the effectiveness that individual players have on the ability of their team to press. In essence we can take what is otherwise a subjective description and reduce it to one number so that it allows for comparison, analysis and ranking, if so desired.',
      created_at: 1485410305946,
    },
    {
      title: 'Sunday league football',
      topic: 'football',
      author: 'weegembump',
      body:
        'Sunday league football is a term used in the United Kingdom to describe those association football leagues which play on Sunday, as opposed to the more usual Saturday. These leagues tend to be lower standard amateur competitions, whose players may have less ability or less time to devote to football. The term pub league can also be used, due to the number of public houses that enter teams. Sunday leagues are sanctioned by the local County Football Association. There is no organised promotion or relegation between leagues, unlike in the National League System, which covers the top few levels of amateur football, although many leagues operate several divisions with promotion and relegation between them. However, ambitious Sunday teams may apply to join a Saturday league for a higher standard of football, and from there graduate to the FA-sanctioned leagues.',
      created_at: 1479470124415,
    }]
    const expected2 = [{
      title: 'Defensive Metrics: Measuring the Intensity of a High Press',
      topic: 'football',
      author: 'tickle122',
      body:
        'In this article, with the use of detailed Opta data, I am going to create a metric that I believe can quantify the extent and aggression of high presses employed by teams, both over a season and in any specific match. I’m going to see if it is possible define the intensity of a press with the use of numbers, more specifically by using some of the events that Opta record. Why would anyone want to do this? Well, for pretty much the same reason that we undertake any analytics study. If we can develop an objective scale which measures the intensity of a press then coaches can quickly see at a glance the strength, or otherwise, of the high pressing that their opposition has utilised in recent games. Teams or fans can also assess how much pressure their team exerted on the opposition in deep positions, and who knows, perhaps in time we will be able to assess the effectiveness that individual players have on the ability of their team to press. In essence we can take what is otherwise a subjective description and reduce it to one number so that it allows for comparison, analysis and ranking, if so desired.',
      created_at: new Date(1485410305946),
    },
    {
      title: 'Sunday league football',
      topic: 'football',
      author: 'weegembump',
      body:
        'Sunday league football is a term used in the United Kingdom to describe those association football leagues which play on Sunday, as opposed to the more usual Saturday. These leagues tend to be lower standard amateur competitions, whose players may have less ability or less time to devote to football. The term pub league can also be used, due to the number of public houses that enter teams. Sunday leagues are sanctioned by the local County Football Association. There is no organised promotion or relegation between leagues, unlike in the National League System, which covers the top few levels of amateur football, although many leagues operate several divisions with promotion and relegation between them. However, ambitious Sunday teams may apply to join a Saturday league for a higher standard of football, and from there graduate to the FA-sanctioned leagues.',
      created_at: new Date(1479470124415),
    }]
    expect(formatDates(list2)).to.eql(expected2)
  })
  it('does not mutate the origional array', () => {
    const list = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    }]
    const listCopy = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    }]
    formatDates(list)
    expect(list).to.eql(listCopy);
  })
});

describe('makeRefObj', () => {
  it('returns an empty object when given an empty array', () => {
    const input = []
    expect(makeRefObj(input)).to.eql({})
  })
  it('returns an object with a key value pair when passed an array with one object', () => {
    const list = [{ article_id: 1, title: 'A' }];
    expect(makeRefObj(list, 'title', 'article_id')).to.eql({ A:1 });
  })
  it('returns an object with multiple key value pairs when passed an array with multiple objects', () => {
    const list = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }];
    const expected = { A: 1, B: 2, C: 3};
    expect(makeRefObj(list, 'title', 'article_id')).to.eql(expected)
  })
  it('does not mutate the origional array', () => {
    const list = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }];
    const listCopy = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }];
    makeRefObj(list);
    expect(list).to.eql(listCopy)
  })
});

describe('formatComments', () => {
  it('returns a new array', () => {
    const comments = [];
    expect(formatComments(comments)).to.eql([]);
    expect(formatComments(comments)).to.not.equal(comments);
  })
  it('renames the created_by and the belongs_to column for one object in the array', () => {
    const articleRef = { 'Designing Better JavaScript APIs': 1 }
    const comments = [{
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      belongs_to: 'Designing Better JavaScript APIs',
      created_by: 'happyamy2016',
      votes: 15,
      created_at: 1497055662171,
    }]
    const expectedComments = [{
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      article_id: 1,
      author: 'happyamy2016',
      votes: 15,
      created_at: new Date(1497055662171),
    }]
    expect(formatComments(comments, articleRef)).to.eql(expectedComments);
  })
  it('renames the created_by and the belongs_to column for multiple objects in the array', () => {
    const articleRef = { 'Sunday league football': 1, 'Designing Better JavaScript APIs': 2 }
    const comments = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      belongs_to: 'Designing Better JavaScript APIs',
      created_by: 'happyamy2016',
      votes: 15,
      created_at: 1497055662171,
    }
    ]
    const expectedComments = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      article_id: 1,
      author: 'happyamy2016',
      votes: 2,
      created_at: new Date(1501187675733),
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      article_id: 2,
      author: 'happyamy2016',
      votes: 15,
      created_at: new Date(1497055662171),
    }
    ]
    expect(formatComments(comments, articleRef)).to.eql(expectedComments);
  })
  it('formats the date for each comment to a javascript date object', () => {
    const articleRef = { 'Sunday league football': 1, 'Designing Better JavaScript APIs': 2 }
    const comments = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      belongs_to: 'Designing Better JavaScript APIs',
      created_by: 'happyamy2016',
      votes: 15,
      created_at: 1497055662171,
    }
    ]
    const expectedComments = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      article_id: 1,
      author: 'happyamy2016',
      votes: 2,
      created_at: new Date(1501187675733),
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      article_id: 2,
      author: 'happyamy2016',
      votes: 15,
      created_at: new Date(1497055662171),
    }
    ]
    expect(formatComments(comments, articleRef)).to.eql(expectedComments);
  })
  it('returns the value in the articleRef object as the value of the article_id property', () => {
    const articleRef = { 'Sunday league football': 1, 'Designing Better JavaScript APIs': 2 }
    const comments = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      belongs_to: 'Designing Better JavaScript APIs',
      created_by: 'happyamy2016',
      votes: 15,
      created_at: 1497055662171,
    }
    ]
    const expectedComments = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      article_id: 1,
      author: 'happyamy2016',
      votes: 2,
      created_at: new Date(1501187675733),
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      article_id: 2,
      author: 'happyamy2016',
      votes: 15,
      created_at: new Date(1497055662171),
    }
    ]
    expect(formatComments(comments, articleRef)).to.eql(expectedComments)
  })
  it('does not mutate the origional array', () => {
    const articleRef = { 'Sunday league football': 1, 'Designing Better JavaScript APIs': 2 }
    const comments =  [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      belongs_to: 'Designing Better JavaScript APIs',
      created_by: 'happyamy2016',
      votes: 15,
      created_at: 1497055662171,
    }
    ]
    const commentsCopy =  [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    },
    {
      body: 'Maiores sed dolor. Consequatur quasi itaque culpa. Tempora ut autem est ad est voluptatem officiis. Ut sequi quaerat qui nam sunt.',
      belongs_to: 'Designing Better JavaScript APIs',
      created_by: 'happyamy2016',
      votes: 15,
      created_at: 1497055662171,
    }
    ]
    formatComments(comments, articleRef)
    expect(comments).to.eql(commentsCopy)
  })
});


