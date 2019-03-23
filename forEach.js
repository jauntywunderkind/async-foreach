"use module"
import Deferrant from "deferrant"

export async function asyncForEach( asyncIterator, fn, options){
	const signal= options&& options.signal;
	// at the end, we either resolve undefined, or throw any seen error/abort
	const defer= Deferrant( signal&& { signal})
	// check for abort right off the bat
	if( signal&& signal.aborted){
		// bail out of we aborted
		return defer
	}

	// handle abort
	signal&& signal.addEventListener("abort", abort=> defer.reject(abort))

	let i= 0

	// unleashing zalgo here: change mode & dispatch synchronously if our input is synchronous
	if( !(Symbol.asyncIterator in asyncIterator)&& !( options&& options.noSync)){
		for( const val of asyncIterator){
			if( signal&& signal.aborted){
				return defer
			}
			const output= fn( val, i++, asyncIterator)
			if( options&& options.await&& output.then){
				await output
			}
		}
		defer.resolve()
		return defer
	}

	// start iterating
	for await( const val of asyncIterator){
		if( signal&& signal.aborted){
			// bail out - we've aborted
			return defer
		}
		// run this iteration
		const output= fn( val, i++, asyncIterator)
		// in await mode, we let the transform return before continuing
		if( options&& options.await){
			await output
		}
	}
	// good we suceeded
	defer.resolve()
	return defer
}
export default asyncForEach
