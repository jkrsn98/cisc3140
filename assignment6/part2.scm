(define sum
  (lambda (x)
    (if (= x 0)
        0
        (+ x (sum (- x 1))))
  )
)

(print "sum(5): " (sum 5))
(print "sum(15): " (sum 15))

(define list1 '(1 2 3 4 5 200))

(print "sum('" list1 "): " (map sum list1))
