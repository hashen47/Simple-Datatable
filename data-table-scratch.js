class Table {
	#id
	#print_btn
	#excel_btn
	#search_box
	#search_selector
	#table
	#ths
	#trs
	#column_visibility_selector
	#column_visibility_options
	#footer_section_values
	#disabled_column_indexes


	constructor (id) {
		this.#id = id;
		this.#table = document.getElementById(`${this.#id}`)

		this.#top_section() // load the top section

		this.#print_btn = this.#table.querySelector(".print")
		this.#excel_btn = this.#table.querySelector(".excel")
		this.#search_box = this.#table.querySelector(".search") // search box
		this.#search_selector = this.#table.querySelector(".search-selector") // search column option selector
		this.#ths = this.#table.querySelectorAll("thead th") // select current table ths
		this.#trs = this.#table.querySelectorAll("tbody tr") // select current table tbody trs
		this.#column_visibility_selector = this.#table.querySelector(".column-visibility-selector") // select current table column-visibility-selector

		this.#load_search_selector_options()
		this.#load_column_visibility_options()
		this.#column_visibility_options = this.#column_visibility_selector.querySelectorAll("div") // select current table column visibility options

		this.#bottom_section() // load the bottom section

		this.#set_data_index()
		this.#show_hide_column_visibility_options()
		this.#show_hide_table_columns()

		this.#search()
		this.#print_table() // when press the print button then print the table
	}


	#top_section() {
		const top = ` 
			<!-- card header -->
			<div class="card-header">
				<div class="col d-flex">
					<div class="col-8 d-flex">
						<div class="col d-flex">
							<button class="btn btn-outline-success print">Print</button>
							<button class="btn btn-outline-primary ms-2 excel">Excel</button>
							<div class="col-5 ms-2" style="position:relative;">
								<div class="form-select col">Column Visibility</div>
								<div class="w-100 column-visibility-selector">
								</div>
							</div>
						</div>
					</div>

					<div class="col-4 d-flex justify-content-end align-items-center">
						<label class="label me-2">Search</label>
						<select class="form-select me-2 filter-column search-selector"> </select>
						<input type="search" name="search" class="search"/>
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
				<div class="row d-flex">
					<!-- data goes here ->
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
			this.#search_selector.querySelectorAll("option")[index].setAttribute("value", index) // in search-selector-options instead of data-index value attribute is set
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


	/*
	 * adding sections to footer
	 */
	add_to_footer (values) {
		this.#footer_section_values = values
		this.#table.querySelector(".card-footer > .row").innerHTML = "" // remove every thing from the table-footer
		/*
		 * value = { index: .. , topic : .. , bg : .. }
		 * values = [ value1, value2, value3 .. ]
		 */
		for (let value of values) {
			let column_index = value.index
			let topic = value.topic
			let total = this.#get_total(column_index)
			let bg_color = value.bg

			/*
			 * create the tag
			 */
			let tag = `
				<div class="col-3 bg-${bg_color} d-flex flex-column align-items-start justify-content-center rounded-3 me-1 mb-1" style="width:24.6% !important">
					<h5 class="pt-2">${topic}</h5>
					<span class="pb-2">Rs.${total}</span>
				</div>
			`

			/* 
			 * insert to tag to footer section
			 */
			this.#table.querySelector(".card-footer > .row").insertAdjacentHTML("beforeend", tag)
		}
	}


	/*
	 * get a total sum of specific column
	 * @params index (start with 0)
	 */
	#get_total (index) {
		let total = 0

		for (let tr of this.#trs) {
			if (! tr.classList.contains("hide")) {
				let value = tr.querySelectorAll("td")[index].innerText

				if (! isNaN(value)) {
					total += Number(value)
				}
			}
		}

		return total.toFixed(2)
	}


	/*
	 * search the specific word in selected column
	 * then filter only trs according to the search results
	 */
	#search () {
		this.#search_box.addEventListener("keyup", e => {
			let index = this.#search_selector.value // select the curret select value of the search_selector
			let search_word = e.target.value.replace(/[^a-zA-Z0-9]/g, "").trim()

			if ( search_word.length > 0 ) {
				this.#trs.forEach(tr => {

					let tds = tr.querySelectorAll("td")
					tr.classList.add("hide") // add the hide class from the tr

					/*
					 * search if tds inner text match with pattern, if matched then only show that tr only 
					 * it means remove the hide class from that tr
					 */
					if (tds[index].innerText.match(new RegExp(".*" + search_word + ".*"))) {
						tr.classList.remove("hide")
					}
				})

				/*
				 * after filter out the data 
				 * then re-calculate table-footer sub sections total values
				 */
				this.add_to_footer(this.#footer_section_values)
			}
			else {
				this.#trs.forEach(tr => tr.classList.remove("hide"))
			}
		})
	}


	/*
	 * load column headers as options in search_selector
	 */
	#load_search_selector_options () {
		this.#ths.forEach(th => {
			let option = `<option>${th.innerText}</option>`
			this.#search_selector.insertAdjacentHTML("beforeend", option)
		})
	}


	/*
	* @params column indexe (start with 0)
	* get the disabled_columns_indexs and then disabled them
	* in normal view, print view and excel view 
	*/
	disable_columns (disable_column_indexes=[]) {
		this.#disabled_column_indexes = disable_column_indexes

		this.#ths.forEach((th, index) => {
			if (this.#disabled_column_indexes.includes(index)) {
				/*
				* disabled columns and ths
				* which data-indexes are in the this.#disabled_column_indexes 
				*/
				th.classList.add("hide")
				this.#trs.forEach(tr => {
					let tds = tr.querySelectorAll("td")
					tds[index].classList.add("hide")
				})
			}
		})
	}


	/*
	* print the table (only not disabled and filtered data)
	*/
	#print_table () {
		this.#print_btn.addEventListener("click", () => {
			// code goes here
		})
	}


	/*
	* get the excel of the table (only not disabled and filtered data)
	*/
	#excel () {
		this.#excel_btn.addEventListener("click", () => {
			// code goes here
		})
	}
}


console.log(this)
