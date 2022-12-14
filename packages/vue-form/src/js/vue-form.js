import axios from 'axios'

class VueForm
{
    /**
     * The vue form constructor
     *
     * @param {object} formData
     */
    constructor( formData = null ) {
        if (formData != null) {
            this.parseFormData( formData )
        }

        this.errors = []
    }

    /**
     * Send a POST request
     *
     * @param  {string}  url
     * @param  {object} data
     *
     * @return {Promise}
     */
    async post( url, data = null ) {
        if (data) {
            this.parseFormData( data )
        }

        let response = await axios.post(url, this)

        this.parseRequest( response )

        return this
    }

    /**
     * Send a PUT request
     *
     * @param  {string}  url
     * @param  {object} data
     *
     * @return {Promise}
     */
    async put( url, data = null ) {
        if (data) {
            this.parseFormData( data )
        }

        let response = await axios.put(url, this)

        this.parseRequest( response )

        return this
    }

    /**
     * Send a PATCH request
     *
     * @param  {string}  url
     * @param  {object} data
     *
     * @return {Promise}
     */
    async patch( url, data = null ) {
        if (data) {
            this.parseFormData( data )
        }

        let response = await axios.patch(url, this)

        this.parseRequest( response )

        return this
    }

    /**
     * Send a PATCH request
     *
     * @param  {string}  url
     * @param  {object} data
     *
     * @return {Promise}
     */
    async delete( url, data = null ) {
        if (data) {
            this.parseFormData( data )
        }

        let response = await axios.delete(url, this)

        this.parseRequest( response )

        return this
    }

    /**
     * Send a GET request
     *
     * @param  {string}  url
     * @param  {object} data
     *
     * @return {Promise}
     */
    async get( url, data = null ) {
        if (data) {
            var esc = encodeURIComponent;
            var query = Object.keys(data).map(k => esc(k) + '=' + esc(data[k])).join('&');
            url += `?${query}`
        }

        let response = await axios.get(url, this)

        this.parseRequest( response )

        return this
    }

    /**
     * Parse the request data
     *
     * @param  {object} response
     *
     * @return {null}
     */
    parseRequest( response ) {
        const { data, status } = response

        this.data = data
        this.status = status
        this.errors = []
        this.message = this.data.message ?? null

        // reset the errors & message
        if (this.status == 200) {
            this.errors = []
            this.message = null
        }

        if( this.data.errors ) {
            Object.keys(this.data.errors).map( (error, index) => this.errors[error] = this.data.errors[error][0] )
        }
    }

    /**
     * Parse the form data
     *
     * @param   {object}  object
     *
     * @return  {null}
     */
    parseFormData( object ) {
        if (typeof object !== 'object' || Array.isArray(object) || !object) {
            return false
        }

        for (const [key, value] of Object.entries(object)) {
            this[key] = value
        }
    }

	/**
	 * Return the form errors
	 *
	 * @return  {object}
	 */
    hasErrors() {
        if( !this.errors ) {
            return false
        }

        return this.errors
    }

	/**
	 * Check wether the field contains a error
	 *
	 * @param   {string}  field
	 *
	 * @return  {object}
	 */
    hasError( field ) {
        if( !this.errors || !this.errors[field] ) {
            return false
        }

        return this.errors[field]
    }

	/**
     * Set a error to a specific field
     *
     * @param   {string}  message
     * @param   {string}  field
     *
     * @return  {boolean}
     */
    setError( message, field = null ) {
        if( !message ) {
            return false
        }

        if (field == null) {
            this.message = message

            return true
        }

        this.errors[field] = message

        return true
    }

	/**
	 * Check wether the form contains a general message
	 *
	 * @return  {string}
	 */
    hasMessage() {
        if( !this.message ) {
            return false
        }

        return this.message
    }

	/**
     * Set a specific form message
     *
     * @param   {string}  message
     *
     * @return  {boolean}
     */
    setMessage( message ) {
        if( !message ) {
            return false
        }

        return this.setError( message )
    }

	/**
     * Clear the form message/error
     *
     * @return  {boolean}
     */
    clear() {
        return this.setError( false )
    }

    reset(data) {
        // Fill the form with user data.
        Object.keys(data).forEach(key => {
            this[key] = data[key]
        })
    }
}

export { VueForm as default }
