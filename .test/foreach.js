import tape from "tape"

import forEach from "../async-foreach.js"

tape( "async foreach 1", async function( t){
	t.plan(6)
	const expected= [ 1, 2, 3, 4]
	async function *generator(){
		yield 1
		yield 2
		yield 3
		yield 4
	}
	const output= forEach(generator(), function( x){
		const expecting= expected.shift()
		t.equal( x, expecting, `found expected number ${expecting}`)
	})
	t.equal( expected.length, 4, "expected is full")
	await output
	t.equal( expected.length, 0, "expected is empty")
	t.end()
})

tape( "sync foreach 1", async function( t){
	t.plan(6)
	const expected= [ 1, 2, 3, 4]
	const output= forEach([ 1, 2, 3, 4], function( x){
		const expecting= expected.shift()
		t.equal( x, expecting, `found expected number ${expecting}`)
	})
	t.equal( expected.length, 0, "expected is empty")
	await output
	t.equal( expected.length, 0, "expected is empty")
	t.end()
})

tape( "sync foreach with zalgo off", async function( t){
	t.plan(6)
	const expected= [ 1, 2, 3, 4]
	const output= forEach([ 1, 2, 3, 4], function( x){
		const expecting= expected.shift()
		t.equal( x, expecting, `found expected number ${expecting}`)
	}, { noSync: true })
	t.equal( expected.length, 4, "expected is empty")
	await output
	t.equal( expected.length, 0, "expected is empty")
	t.end()
})

