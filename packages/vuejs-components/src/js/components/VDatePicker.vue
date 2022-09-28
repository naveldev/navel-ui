<template>
    <div class="">
        <div class="form-control d-flex justify-content-start" :class="{ 'form-error': error, 'form-loading': loading, 'color-muted': disabled }" @click="!disabled ? setState(!calendar.state) : () => {}">
            <!-- Prefix -->
            <div v-if="this.$slots.prefix || prefix" class="p-3 mr-pull-3">
                <slot name="prefix">
                    {{ prefix }}
                </slot>
            </div>

            <!-- Input -->
            <slot name="input" v-bind:date="this.calendar.selectedDate" v-bind:formattedDate="formatDate">
                <span class="flex-grow-1 p-3">{{ formatDate }}</span>
            </slot>

            <!-- Suffix -->
            <div v-if="this.$slots.suffix || suffix" class="p-3 ml-pull-3">
                <slot name="suffix">
                    {{ suffix }}
                </slot>
            </div>

            <!-- Icons -->
            <div v-if="loading" class="p-3">
                <i class="fas fa-spinner-third fa-spin"></i>
            </div>
            <div v-else-if="error" class="color-danger p-3">
                <span :class="{ 'tooltip-left': errorMessage !== false }" :aria-label="errorMessage">
                    <i class="far fa-exclamation"></i>
                </span>
            </div>
        </div>
        <div v-if="calendar.state" class="card">
            <div class="card-heading d-flex p-1">
                <button class="btn btn-primary btn-soft mr-auto" @click="this.addMonths(-12)">&lt;&lt;</button>

                <button class="btn btn-primary btn-soft mr-auto" @click="previousMonth">&lt;</button>

                <strong class="flex-fill-1">{{ currentMonthLabel }} {{ currentYear }}</strong>

                <button class="btn btn-primary btn-soft ml-auto" @click="nextMonth">&gt;</button>

                <button class="btn btn-primary btn-soft ml-auto" @click="this.addMonths(12)">&gt;&gt;</button>
            </div>

            <div class="card-content p-1">
                <div class="calendar">
                    <div class="d-flex my-2" v-for="(dayLabel, index) in dayLabels" :key="index">
                        <strong>{{ dayLabel }}</strong>
                    </div>

                    <button v-for="(day, index) in dates" :key="index" class="btn btn-soft p-2" :class="dayClassObj(day)" @click.prevent="setSelectedDate(day)">
                        {{ formatDateToDay(day) }}
                    </button>
                </div>
            </div>

            <div class="card-content d-flex p-0">
                <button class="btn btn-primary btn-outline btn-block m-1" @click.prevent="setSelectedDate(null)">
                    Clear
                </button>
                <button class="btn btn-primary btn-action btn-block m-1" @click.prevent="setSelectedDate(day)">
                    Apply
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import '../utils/date.js'

    // move this to the language system
    const DAY_LABELS = ['S', 'M', 'T', 'W', 'Th', 'F', 'S']

    const MONTH_LABELS = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"]

    export default {
        name: "VDatePicker",

        data() {
            return {
                input: null,
                isBooted: false,
                dayLabels: null,
                calendar: {
                    ratelimit: new Date(),
                    state: false,
                    today: null,
                    selectedDate: null,
                    currDateCursor: null,
                },
            }
        },

        props: {
            modelValue: {
                default: ''
            },
            value: {
                required: false,
            },
            error: {
                required: false,
            },
            loading: {
                type: Boolean,
                required: false,
                default: false,
            },
            required: {
                type: Boolean,
                required: false,
                default: false,
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            },
            prefix: {
                required: false,
                default: false,
            },
            suffix: {
                required: false,
                default: false,
            },
            dateFrom: {
                type: Date,
                required: false,
                default: null,
            },
            dateUntill: {
                type: Date,
                required: false,
                default: null,
            },
            // old hooks
            destroyed: {
                type: Function,
                required: false
            },
            destroyedWith: {
                type: Array,
                default: [],
                required: false
            },
        },

        created() {
            this.setup(this.modelValue)
        },

		mounted () {
            document.addEventListener('click', this.triggerClose)

            this.$nextTick(() => this.isBooted = true)
		},

        beforeDestroy() {
            document.removeEventListener('click',this.triggerClose)
        },

        methods: {
            setup(modelValue) {
                this.dayLabels = DAY_LABELS.slice()
                this.calendar.today = new Date()

                this.calendar.selectedDate = null
                this.calendar.currDateCursor = this.calendar.today

                if (modelValue) {
                    this.calendar.currDateCursor = new Date(modelValue)
                    this.calendar.selectedDate = new Date(modelValue)

                    if (isNaN(this.calendar.currDateCursor)) {
                        this.calendar.selectedDate = this.calendar.today
                        this.calendar.currDateCursor = this.calendar.today
                    }
                }
            },
            /**
             * Close the calendar
             *
             * @param   {boolean}  state
             *
             * @return  {void}
             */
			triggerClose(e) {
				if (this.$el.contains(e.target) || this.calendar.state === false) {
                    return false
				}

                this.setState(false)
			},
            /**
             * Toggle or set the calendar state
             *
             * @param   {boolean}  state
             *
             * @return  {boolean}
             */
            setState(state) {
                if (!this.ratelimiter(200)) {
                    return false
                }

                // `destroyed` hook
                if (state === false && this.calendar.state === true && this.destroyed) {
                    this.destroyed(this.calendar.selectedDate, ...this.destroyedWith)
                }

                return this.calendar.state = state
            },
            /**
             * A simple yet efficient ratelimiter for opening or closing the calendar
             *
             * @param   {int}  ms
             *
             * @return  {boolean}
             */
            ratelimiter(ms = 500) {
                let date = new Date()
                // make sure we cant spam this
                if (this.calendar.ratelimit >= date) {
                    return false
                }

                this.calendar.ratelimit = new Date(date.setMilliseconds(date.getMilliseconds() + ms))

                return true
            },
            /**
             * Get the day of the month from a date
             *
             * @param   {Date}  day
             *
             * @return  {Date}
             */
            formatDateToDay(day) {
                return new Date(day.date).getDate()
            },
            /**
             * Generate a day object
             *
             * @param   {Date}  day
             *
             * @return  {Object}
             */
            dayClassObj(day) {
                return {
                    'color-muted': !day.isCurrentMonth,
                    'btn-primary' : day.isToday,
                    'btn-active': day.isSelected,
                    'btn-disabled': (day.inPast === true || day.inFuture === true),
                }
            },
            /**
             * Add months to the current date
             *
             * @return  {void}
             */
            addMonths(months) {
                this.calendar.currDateCursor = new Date(this.calendar.currDateCursor).addMonths(months)
            },
            /**
             * Go to the next month
             *
             * @return  {void}
             */
            nextMonth() {
                this.addMonths(1)
            },
            /**
             * Go to the previous month
             *
             * @return  {void}
             */
            previousMonth() {
                this.addMonths(-1)
            },
            /**
             * Set and update the selected date
             *
             * @param   {Date}  day
             *
             * @return  {void}
             */
            setSelectedDate(day = null) {
                if (!day) {
                    this.$emit('update:modelValue', this.calendar.selectedDate = null)

                    return false
                }

                this.$emit('update:modelValue', this.calendar.selectedDate = new Date(day.date))

                // execute custom callback
                if (this.select) {
                    this.select(this.calendar.selectedDate)
                }

                // change calendar to correct month if they select previous or next month's days
                if (!day.isCurrentMonth) {
                    const selectedMonth = this.calendar.selectedDate.getMonth()

                    this.calendar.currDateCursor = new Date(this.calendar.selectedDate.getMonth())
                }
            },
            /**
             * Get a array of days between 2 dates
             *
             * @param   {Date}  startDate
             * @param   {Date}  stopDate
             *
             * @return  {Array}
             */
            getDateRange(startDate, stopDate) {
                var dateArray = new Array()
                var currentDate = startDate

                while (currentDate <= stopDate) {
                    dateArray.push(currentDate)
                    currentDate = new Date(currentDate).addDays(1)
                }

                return dateArray
            },
        },

        computed: {
            currentMonth() {
                return new Date(this.calendar.currDateCursor).getMonth()
            },
            currentYear() {
                return new Date(this.calendar.currDateCursor).getFullYear()
            },
            currentMonthLabel() {
                return MONTH_LABELS[this.currentMonth]
            },
            dates() {
                const cursorDate = this.calendar.currDateCursor

                let date
                let today = new Date()
                let startDate = cursorDate.startOfMonth()
                let endDate = cursorDate.endOfMonth()

                const daysNeededForLastMonth = new Date(startDate).getDay(),
                daysNeededForNextMonth = 6 - new Date(endDate).getDay()

                startDate = (date = new Date(startDate)).addDays(-daysNeededForLastMonth)
                endDate = (date = new Date(endDate)).addDays(daysNeededForNextMonth)

                return this.getDateRange(startDate, endDate).map(date => ({
                    date,
                    inPast: (this.dateFrom && new Date(date).inPast(this.dateFrom)) ?? null,
                    inFuture: (this.dateUntill && new Date(date).inFuture(this.dateUntill)) ?? null,
                    isCurrentMonth: date.getMonth() == cursorDate.getMonth(),
                    isToday: (date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear()),
                    isSelected: this.calendar.selectedDate && (this.calendar.selectedDate.getDate() == date.getDate() && date.getMonth() == this.calendar.selectedDate.getMonth() && date.getFullYear() == this.calendar.selectedDate.getFullYear())
                }))
            },
            errorMessage() {
                if (typeof this.error === 'string') {
                    return this.error
                }

                if (typeof this.error.message === 'string') {
                    return this.error.message
                }

                return false
            },
            formatDate() {
                let date

                if (!(date = this.calendar.selectedDate)) {
                    return 'NaN'
                }

                date = new Date(date)

                if (isNaN(date)) {
                    return null
                }

                const day = date.getDate()
                const month = date.getMonth() + 1
                const year = date.getFullYear()

                return `${day}/${month}/${year}`
            },
        },

        watch: {
            modelValue: {
                handler: function (value) {
                    this.setup(value)
                },
                immediate: true,
            },
        },
    }
</script>

<style scoped>
.card {
    min-width: 300px;
    z-index: 99999;
    position: absolute;
}
.card * {
    align-items: center;
    justify-content: center;
}
.calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}
.calendar > .card-heading {
    grid-column: 1/span 7;
}
.calendar > .day {
    color: rgb(var(--color-dark));
    font-size: 1rem;
    border-radius: 2px;
}
.calendar > .day.selected {
  border: 1px solid rgb(var(--color-gray));
}
.calendar > .day.current {
  color: rgb(var(--color-dark));
}
.calendar > .day::before {
  content: "";
  display: inline-block;
  height: 0;
  padding-bottom: 100%;
  width: 1px;
}
.calendar > .day button {
  color: inherit;
  background: transparent;
  border: transparent;
  height: 100%;
  width: 100%;
}
.calendar > .today {
  background: rgb(var(--color-muted));
  border-radius: 2px;
}
</style>
