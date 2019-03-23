"use module"
import tape from "tape"

import map from "../map.js"

tape( "async map 1", async function( t){
	t.plan(6)
	const expected= [ 2, 4, 6, 8]
	async function *generator(){
		yield 1
		yield 2
		yield 3
		yield 4
	}
	const mapped= map(generator(), x=> x* 2)
	t.equal( expected.length, 4, "expected is full")
	for await (const x of mapped){
		const expecting= expected.shift()
		t.equal( x, expecting, `expect number ${expecting}`)
	}
	t.equal( expected.length, 0, "expected is empty")
	t.end()
})
