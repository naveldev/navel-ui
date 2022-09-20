<template>
    <div class="card" v-if="data">
        <!-- Options -->
        <div v-if="this.$slots.multiSelectOptions" class="card-content border-bottom d-flex justify-content-end">
            <slot name="multiSelectOptions" v-bind:entries="selectedEntries" />
        </div>

        <!-- Table -->
		<table class="table table-responsive">
			<thead>
				<tr>
                    <th v-if="this.$slots.multiSelectOptions"></th>
					<th v-for="(type, key) in defaultColumns" :key="key">{{ settings.parseColumns[type] || type }}</th>
                    <th v-if="this.$slots.action"></th>
				</tr>
			</thead>
			<tbody :class="{ 'table-loading': loading }">
				<tr v-for="(entry, key) in data" :key="key">
                    <td v-if="this.$slots.multiSelectOptions">
                        <input type="checkbox" v-model="selectedEntries" :value="entry" :id="key" />
                    </td>
					<td v-for="(type, key) in defaultColumns" :key="key">
                        <slot :name="type" v-bind:value="parseAttributeFromArray(entry, type)" v-bind:entry="entry">
                            <div v-if="(typeof parseAttributeFromArray(entry, type) == 'object')" v-for="(value, key) in parseAttributeFromArray(entry, type)" :key="key" class="badge badge-primary">{{ key }}: {{ value }}</div>
                            <span v-else>{{ truncate(parseAttributeFromArray(entry, type) ?? false, 40, '...') }}</span>
                        </slot>
					</td>
                    <td v-if="this.$slots.action">
                        <slot name="action" v-bind:entry="entry"/>
                    </td>
				</tr>
			</tbody>
		</table>

        <!-- Controls -->
        <div v-if="this.paginator" class="card-footer">
            <div class="d-flex">
                <p class="text-muted p-1">Page {{ paginator.page }} / {{ paginator.pages }}</p>

                <div class="ml-auto">
                    <button class="btn btn-rounded btn-soft" :class="{ 'btn-disabled': (paginator.page <= 1) }" @click="previous">
                        <i class="far fa-long-arrow-left"></i>
                    </button>
                    <button v-for="(page, key) in pages" :key="key" class="btn btn-rounded btn-soft" :class="{ 'btn-active': (page == this.paginator.page) }" @click="setPage(page)">
                        {{ page }}
                    </button>
                    <button class="btn btn-rounded btn-soft" :class="{ 'btn-disabled': (paginator.page >= paginator.pages) }" @click="next">
                        <i class="far fa-long-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'VTable',

		props: {
			loading: {
                type: Boolean,
                default: false
			},
			data: {
                type: Object,
			},
			options: {
                type: Object,
			},
			paginator: {
                type: Object,
			},
			modelValue: {
                default: 1,
			}
		},

		data () {
            return {
                selectedEntries: [],
                defaultColumns: {},
                defaultOptions: {
                    parseColumns: {},
                    columns: []
                },
                page: 1
            }
		},

        mounted() {
            this.defaultColumns = this.parseColumnsFromData(this.data[0])
        },

        methods: {
            /**
             * Go to the previous page
             *
             * @return  {void}
             */
			previous() {
				this.setPage(this.paginator.page - 1)
			},
            /**
             * Go to the next page
             *
             * @return  {void}
             */
			next() {
				this.setPage(this.paginator.page + 1)
			},
            /**
             * Navigate to a specific page
             *
             * @param   {int}  page
             *
             * @return  {void}
             */
            setPage(page) {
                // check if we have a paginator
                if (!this.paginator) {
                    return false
                }

                // check if we are in the limits of the pages
                if (page <= 0 || page > this.paginator.pages) {
					return false, console.error(`Page [${page}] doesn't exist.`)
				}

                this.paginator.page = page
            },
            /**
             * Truncate a string
             *
             * @param   {string}  value
             * @param   {number}  stop
             * @param   {string}  clamp
             *
             * @return  {string}
             */
            truncate(value, stop, clamp) {
                if (typeof value === 'array' || typeof value === 'object') {
                    value = JSON.stringify(value)
                }

                const text = value.toString()

                return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
            },
            /**
             * Get a array of numbers between 2 numbers
             *
             * @param   {int}  start
             * @param   {int}  end
             *
             * @return  {array}
             */
            range(start, end) {
                return Array(end - start + 1).fill().map((_, idx) => start + idx)
            },
            /**
             * Format and look for a key in a entry
             *
             * @param   {Object}  entry
             * @param   {string}  key
             *
             * @return  {string}
             */
            parseAttributeFromArray(entry, column) {
                let value

                if(!entry[column.split('.')[0]]) {
                    return 'null'
                }

                let array
                if (typeof (array = column.split('.')) === 'object') {
                    value = entry;

                    array.forEach(element => {
                        if (!value[element] || !value.hasOwnProperty(element)) {
                            return false
                        }

                        value = value[element]
                    });

                    return value
                }

                return false
            },
            /**
             * Parse and return the keys from a array
             *
             * @param   {array}  array
             *
             * @return  {array}
             */
            parseArrayToKeys(array) {
                let keys = Object.keys(array)
                let parsedArray = array

                for (const [key, value] of Object.entries(keys)) {
                    if (typeof array[value] === 'object') {
                        parsedArray[value] = this.parseArrayToKeys(array[value])
                    } else {
                        parsedArray[value] = true
                    }
                }

                return parsedArray
            },
            /**
             * Parse the existing columns, and merge them with the given columns
             *
             * @param   {array}  array
             *
             * @return  {array}
             */
            parseColumnsFromData(array) {
                let columns = []
                let defaultColumns = []
                let slicedArray

                // check if the array exists
                if (!array || !(slicedArray = [].slice.call(array))) {
                    return false
                }

                defaultColumns = this.parseArrayToKeys(slicedArray)

                if (this.settings.columns.length >= 1) {
                    this.settings.columns.forEach(element => {
                        if (this.parseAttributeFromArray(defaultColumns, element)) {
                            columns.push(element)
                        }
                    });
                }

                if (columns.length <= 0) {
                    return Object.keys(array)
                }

                return columns
            },
        },

        computed: {
            pages() {
                // check if we should show the buttons
                if (!this.paginator || this.paginator.buttons < 1) {
                    return false
                }

                // check if the amount is odd or even
                if ((this.paginator.buttons % 2) === 0) {
                    this.paginator.buttons + 1;
                }

                // set the button limitation on 10
                if (this.paginator.buttons > 15) {
                    this.paginator.buttons = 15
                }

                let buttons = ((this.paginator.buttons / 2) || 3)
                let startAt = this.paginator.page - buttons
                let endAt = this.paginator.page + buttons

                let startDiff
                if (startAt < 3) {
                    startAt += (startDiff = -startAt + 1)

                    if (startDiff + 1 > 0) {
                        endAt += startDiff + 1
                    }
                }

                let endDiff
                if ((endAt + 1) > this.paginator.pages) {
                    endAt -= (endDiff = (endAt + 1) - this.paginator.pages)

                    if (endDiff > 0) {
                        startAt -= (startAt - endDiff) > 0 ? endDiff : 0
                    }
                }

                // make the array between ranges
                let pages = this.range(startAt, endAt)

                // add the first page to the array
                if (startAt > 1) {
                    pages.unshift(1)
                }

                // add the last page to the array
                if (endAt < this.paginator.pages) {
                    pages.push(this.paginator.pages)
                }

                return pages
            },
            settings() {
                if (!this.options) {
                    return this.defaultOptions
                }

                return { ...this.defaultOptions, ...this.options }
            },
        },

        watch: {
            // watching prop
            modelValue: {
                handler: function (value) {
                    if (value) {
                        this.page = value
                    }
                },
                immediate: true,
            },

            // watching data() property
            "tableOptions.paginator.page": {
                handler: function (value) {
                    this.$emit('update:modelValue', value)
                },
                immediate: true
            }
        }
	}
</script>
