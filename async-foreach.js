import Deferrant from "deferrant"

export const Aborted= Object.freeze({})

export async function asyncForEach( asyncIterator, fn, options){
	const signal= options&& options.signal
	const defer= Deferrant( signal&& { signal})
	let i= 0
	async function asyncForEachNext( value){
		if( signal&& signal.aborted){
			defer.reject( Aborted)
			return
		}
		let cursor= await asyncIterator.next()
		if( signal&& signal.aborted){
			defer.reject( Aborted)
			return
		}
		try{
			fn( cursor.value, i++, asyncIterator)
		}catch(err){
			defer.reject( err)
		}
		if( cursor.done){
			defer.resolve()
			return
		}
		asyncForEachNext( asyncIterator.next())
	}
	asyncForEachNext()
	return defer.promise
}
export default asyncForEach
