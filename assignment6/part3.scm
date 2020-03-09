(print (/ 3 0))

(define divide
  (lambda (n d)
    (cond
      ((zero? d)
        (raise 'divide-by-zero)
      )
      (else
        (/ n d)
      )
    )
  )
)

(print (divide 5 1))
(print (divide 5 0))
