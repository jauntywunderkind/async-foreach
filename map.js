"use module"
export async function * asyncMap( asyncIterator, fn){
	let i= 0;
	for await( const val of asyncIterator){
		yield fn( val, i++, asyncIterator)
	}
}
export default asyncMap
