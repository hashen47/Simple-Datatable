class Table {
	#id
	#table
	#ths
	#trs
	#column_visibility_selector
	#column_visibility_options


	constructor (id) {
		this.#id = id;
		this.#table = document.getElementById(`${this.#id}`)

		this.#top_section() // load the top section

		this.#ths = this.#table.querySelectorAll("thead th") // select current table ths
		this.#trs = this.#table.querySelectorAll("tbody tr") // select current table tbody trs
		this.#column_visibility_selector = this.#table.querySelector(".column-visibility-selector") // select current table column-visibility-selector

		this.#load_column_visibility_options()
		this.#column_visibility_options = this.#column_visibility_selector.querySelectorAll("div") // select current table column visibility options

		this.#bottom_section() // load the bottom section

		this.#set_data_index()
		this.#show_hide_column_visibility_options()
		this.#show_hide_table_columns()

	}


	#top_section() {
		const top = ` 
			<!-- card header -->
			<div class="card-header">
				<div class="col d-flex">
					<div class="col-8 d-flex">
						<div class="col-3 d-flex">
							<button class="btn btn-outline-success">Print</button>
							<button class="btn btn-outline-primary ms-2">Excel</button>
						</div>
						<div class="col-5">
							<div class="col" style="position:relative;">
								<div class="form-select col">Column Visibility</div>
								<div class="w-100 column-visibility-selector">
								</div>
							</div>
						</div>
					</div>

					<div class="col-4 d-flex justify-content-end align-items-center">
						<label class="label me-2">Search</label>
						<input type="search" name="search" />
					</div>
				</div>
			</div>
			<!-- /card header -->
		`;

		// insert the top section
		this.#table.insertAdjacentHTML("afterbegin", top)
	}


	#bottom_section() {
		const bottom = `
			<!-- card footer -->
			<div class="col card-footer">
				<div class="row">
					<div class="col-3 bg-info d-flex flex-column align-items-start justify-content-center rounded-3">
						<h3 class="pt-2">Approved Amount</h3>
						<span class="pb-2">Rs.20,000.00</span>
					</div>
					<div class="col-3">two</div>
					<div class="col-3">three</div>
					<div class="col-3">four</div>
				</div>
			</div>
			<!-- /card footer --> `

		// insert the bottom section
		this.#table.insertAdjacentHTML("beforeend", bottom)
	}


	/*
	 * set attribute called data-index to ths and tbody tds
	 * same data-index value is set to the tds which are under that th
	 */
	#set_data_index() {
		this.#ths.forEach((head, index) => {

			this.#ths[index].setAttribute("data-index", index)
			this.#column_visibility_options[index].setAttribute("data-index", index)
			this.#trs.forEach(tr => {
				tr.querySelector(`td:nth-child(${index+1})`).setAttribute("data-index", index)
			})
		}) 
	}


	/*
	 * load table th values to the column-visibility-selector
	 */
	#load_column_visibility_options() {
		this.#ths.forEach(th => {
			let div = `<div class="col">${th.innerText}</div>`
			this.#column_visibility_selector.insertAdjacentHTML("beforeend", div)
		})
	}


	/*
	 * this method show and hide the column visibility options
	 */
	#show_hide_column_visibility_options() {
		this.#column_visibility_selector.previousElementSibling.addEventListener("click", e => {
			this.#column_visibility_selector.classList.toggle("show")
		})
	}


	/*
	 * show hide table columns
	 */
	#show_hide_table_columns() {
		this.#column_visibility_options.forEach((option, index) => {
			option.addEventListener("click", e => {

				option.classList.toggle("select")

				let index = option.getAttribute("data-index")

				this.#ths.forEach(th => { 
					if (th.getAttribute("data-index") == index) th.classList.toggle("hide") 
				})

				this.#table.querySelectorAll("tbody td").forEach(td => {
					if (td.getAttribute("data-index") == index) td.classList.toggle("hide")
				})
			})
		})
	}

}
