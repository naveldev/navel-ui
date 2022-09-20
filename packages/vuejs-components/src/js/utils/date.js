/**
 * Add days to the Date object
 *
 * @param   {int}  days
 *
 * @return  {void}
 */
Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf())

    return new Date(date.setDate(date.getDate() + days))
}

/**
 * Add months to the Date object
 *
 * @param   {int}  months
 *
 * @return  {void}
 */
Date.prototype.addMonths = function(months) {
    let date = new Date(this.valueOf())

    return new Date(date.setMonth(date.getMonth() + months))
}

/**
 * Add years to the Date object
 *
 * @param   {int}  years
 *
 * @return  {void}
 */
Date.prototype.addYears = function(years) {
    let date = new Date(this.valueOf())

    return new Date(date.setFullYear(date.getFullYear() + years))
}

/**
 * Get the date of the first day of a month
 *
 * @return  {Date}
 */
Date.prototype.startOfMonth = function() {
    let date = new Date(this.valueOf())

    return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Get the date of the last day of a month
 *
 * @return  {Date}
 */
Date.prototype.endOfMonth = function() {
    let date = new Date(this.valueOf())

    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * Check wether the date is in the past or not
 *
 * @param   {string}  day
 *
 * @return  {Date}
 */
Date.prototype.inPast = function(now = null) {
    let date = new Date(this.valueOf())

    if (now === null) {
        now = new Date()
    }

    now.setHours(0, 0, 0, 0)

    return date < now
}

/**
 * Check wether the date is in the future or not
 *
 * @param   {string}  day
 *
 * @return  {Date}
 */
Date.prototype.inFuture = function(now = null) {
    let date = new Date(this.valueOf())

    if (now === null) {
        now = new Date()
    }

    now.setHours(0, 0, 0, 0)

    return date > now
}
