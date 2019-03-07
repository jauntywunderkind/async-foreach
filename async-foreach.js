import Deferrant from "deferrant"

export async function asyncForEach( asyncIterator, fn, options){
	// 
	const defer= Deferrant( signal&& { signal})
	// handle abort
	options&& options.signal&& options.signal.addEventListener("abort", abort=> defer.reject(abort))

	let i= 0
	for await( const val of asyncIterator){
		if( signal&& signal.aborted){
			// bail out of we aborted
			return defer
		}
		fn( val, i++, asyncIterator)
	}
	defer.resolve()
	return defer
}
export default asyncForEach
