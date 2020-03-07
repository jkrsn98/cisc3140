(define list1 '(15 "foo" 100))
(define list2 '(1 2 3 3 2 1))
(define list3 '("dog" "cat" "rat" "cat" "dog"))
(define str1 "palindrome")
(define str2 "cattac")

(define (reverser l)
  (if (null? l)
     '()
     (append (reverser (cdr l)) (list (car l)))
  )
)

(print "list1: "list1 "\nreversed: " (reverser list1))
(print "\nlist2: "list2 "\nreversed: " (reverser list2))

(print "\n-----------------------")

(define isPalindrome
  (lambda (li)
    (equal? li (reverser li))
  )
)

(print "\nlist1: " list1 "\nisPalindrome: "(isPalindrome list1))
(print "\nlist2: " list2 "\nisPalindrome: "(isPalindrome list2))
(print "\nlist3: " list3 "\nisPalindrome: "(isPalindrome list3))
(print "\nstr1: " str1 "\nisPalindrome: "(isPalindrome (string->list str1)))
(print "\nstr2: " str2 "\nisPalindrome: "(isPalindrome (string->list str2)))
