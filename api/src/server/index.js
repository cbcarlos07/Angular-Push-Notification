const express = require('express')
const webpush = require('web-push')
const cors    = require('cors')
const bobdyParser = require('body-parser')

const PUBLIC_VAPID = "BOZ2vUuFBgKO2wEfH6jhLpgw8W0WDnApgRce_4oOVw2zsifge9fyaMfC-SVSxzl9aqnc70idpw_zcA5luliMEPA"
const PRIVATE_VAPID = "9sfcETj-SUrWuf8BHI-O0w6Wa9Xv2NaNxYyUpV2LBWs"

const app = express()

app.use( cors() )
app.use( bobdyParser.json() )

webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID)
const fakeDatabase = []
app.post('/subscription', (req, res, next)=>{
    const subscription = req.body
    fakeDatabase.push(subscription)
})

app.get('/', (req, res, next)=>{
    res.send({msg: 'Api'})
    next()
})


app.post('/sendNotification', (req, res, next)=>{
    console.log('sendNotification');
    
    const notificationPayLoad = {
        notification: {
            title: 'New Notification',
            body: 'This is the body of the notification',
            icon: 'assets/icons/icon-512x512.png'
        }
    }

    const promises = []

    fakeDatabase.forEach( subscription => {
        promises.push(
            webpush.sendNotification(
                subscription,
                JSON.stringify( notificationPayLoad )
            )
        )
    })

    Promise.all( promises ).then( () => res.sendStatus(200))

})
module.exports = app