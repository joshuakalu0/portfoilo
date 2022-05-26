let type = {
	count: 0,
	wordList: [],
	speed: 90,
	listCount: 0,
	element: null,
	delayTime: 250,
	start: false,
	write: function (word, traceWord) {
		this.start = true;
		if (this.count < word.length || traceWord.length == this.count) {
			this.element.textContent += word[this.count];
			this.count++;
			let t1 = setTimeout(() => {
				if (this.count == traceWord.length) {
					//this.count = 0;
					let t2 = setTimeout(() => {
						clearTimeout(t2);
						this.clear(traceWord, traceWord);
					}, this.delayTime);
				} else {
					this.write(word, traceWord);
				}
				clearTimeout(t1);
			}, this.speed);
		}
	},
	writeOnly: function (word) {
		if (this.count < word.length) {
			this.element.textContent += word[this.count];
			this.count++;
			let t1 = setTimeout(() => {
				if (word[this.count] == " ") {
					//this.count = 0;
					let t2 = setTimeout(() => {
						clearTimeout(t2);
						this.writeOnly(word);
					}, (this.speed * 2) / 2);
				} else {
					this.writeOnly(word);
				}
				clearTimeout(t1);
			}, this.speed / 2);
		}
	},

	clear: function (word, traceWord) {
		if (this.count > 0 || this.count == 0) {
			let newArray = word.split("");
			newArray.pop();
			let newarg = newArray.join("");
			this.element.textContent = newarg;

			this.count--;
			let c1 = setTimeout(() => {
				if (this.count == 0) {
					this.count = 0;
					let c2 = setTimeout(() => {
						this.listCount++;
						this.start();
						clearTimeout(c2);
						//. this.write(traceWord, traceWord )
					}, this.delayTime);
				} else {
					this.clear(newarg, traceWord);
				}
				clearTimeout(c1);
			}, this.speed);
		}
	},
	start: function () {
		// console.log(this);
		if (this.listCount == this.wordList.length) {
			this.listCount = 0;
		}
		this.start = true;
		this.write(this.wordList[this.listCount], this.wordList[this.listCount]);
		this.start = false;
		// console.log(this.wordlist, this.listCount);
	},
};

export { type };

// let words = ["student", "web designer ", "programmer"];
// let speed = 150;
// let count = 0;
// let checkarr = 0;
// let para = document.querySelector("span");
// type.element = para;
// type.wordList = words;
// type.start();
//type.write('student', 'student')
// function typewrite(arg, check) {
//   console.log(arg);
//   if (count < arg.length || check.length == check) {
//     console.log('well', count);
//     para.textContent += arg[count]
//     count++;
//     setTimeout(() => {
//       if (count == check.length) {
//       count = 0;
//       setTimeout(()=>{
//         typeclear(check, check)
//       }, 1500)

//     }else{
//       typewrite(arg, check)
//     }
//     }, speed)
//   }
// }

// function getWord(arg) {

// }

// function typeclear(arg, check) {

//   if (count < check.length || count == check.length) {

//     let arr = arg.split('')
//     arr.pop()
//     let newarg = arr.join('')
//     para.textContent = arr.join('')

//     count++;
//     setTimeout(() => {
//       if (count == check.length) {
//       count = 0;
//       setTimeout(()=>{
//         checkarr++;
//         control()
//         // typewrite(check, check)
//       }, 1500)

//     }else{
//       typeclear(newarg, check)
//     }

//     }, speed)
//   }
// }
// // typeclear(para.textContent, para.textContent)

// function control() {
//   if (checkarr == words.length){
//     checkarr =0
//   }
//   typewrite(words[checkarr], words[checkarr])
//   console.log(words[checkarr]);
// }
// control()
