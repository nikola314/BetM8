const Game = require('../models/game');

const League = require('../models/league');

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const db = require('../util/database');

exports.getIndex = (req, res, next) => {
  let footballGames = [];
  let basketballGames = [];
  let tennisGames = [];
  const today = new Date();
  const tomorrow = new Date();
  today.setHours(0,0,0,0);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0,0,0,0);

  League.findAll({
    where: {
      sport: 'Football'
    }
  }).then(allLeagues => {
    let leagueIds = [];
    for (let league of allLeagues) {
      leagueIds.push(league.id);
    }

    Game.findAll({
      where: {
        leagueId: {
          [Op.or]: [leagueIds]
        },
        date: {
          [Op.lt]: tomorrow,
          [Op.gt]: today
        }
      },
      order: db.literal('date ASC')
    }).then(games => {
      for (let game of games) {
        footballGames.push(game);
      }

      League.findAll({
        where: {
          sport: 'Basketball'
        }
      }).then(allLeagues => {
        let leagueIds = [];
        for (let league of allLeagues) {
          leagueIds.push(league.id);
        }

        Game.findAll({
          where: {
            leagueId: {
              [Op.or]: [leagueIds]
            },
            date: {
              [Op.lt]: tomorrow,
              [Op.gt]: today
            }
          },
          order: db.literal('date ASC')
        }).then(games => {
          for (let game of games) {
            basketballGames.push(game);
          }

          League.findAll({
            where: {
              sport: 'Tennis'
            }
          }).then(allLeagues => {
            let leagueIds = [];
            for (let league of allLeagues) {
              leagueIds.push(league.id);
            }

            Game.findAll({
              where: {
                leagueId: {
                  [Op.or]: [leagueIds]
                },
                date: {
                  [Op.lt]: tomorrow,
                  [Op.gt]: today
                }
              },
              order: db.literal('date ASC')
            }).then(games => {
              for (let game of games) {
                tennisGames.push(game);
              }

              return res.render('home/index', {
                pageTitle: 'BetM8',
                path: '/',
                footballGames: footballGames,
                basketballGames: basketballGames,
                tennisGames: tennisGames
              })
            })
          })
        })
      })
    })
  })
};