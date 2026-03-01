;; Donation DApp Contract (Enhanced: Accumulate Donations)

(define-map donations { donor: principal } { amount: uint })
(define-data-var total-donated uint u0)

(define-constant err-zero-donation (err u100))

;; Donate function with accumulation
(define-public (donate (amount uint))
  (if (is-eq amount u0)
      err-zero-donation
      (let (
            (current (default-to u0 (get amount (map-get? donations { donor: tx-sender }))))
           )
        ;; Update donor's donation amount
        (map-set donations { donor: tx-sender } { amount: (+ current amount) })

        ;; Update total donated
        (var-set total-donated (+ (var-get total-donated) amount))

        (ok "Donation recorded")
      )
  )
)

;; Get individual donor donation
(define-read-only (get-donation (donor principal))
  (default-to u0 (get amount (map-get? donations { donor })))
)

;; Get total donated
(define-read-only (get-total-donated)
  (var-get total-donated)
)

;; Extra helper functions (cleaned duplicates)
(define-public (dummy-func-1) (ok u0))
(define-public (dummy-func-2) (ok u0))
(define-public (dummy-func-3) (ok u0))
(define-read-only (dummy-read-1) u0)
(define-read-only (dummy-read-2) u0)
