import { CronJob } from 'cron'
import BuildCandle from '../api/data/modules/buildCandle'

new CronJob('*/60 * * * * *', () => new BuildCandle()).start()
new BuildCandle()