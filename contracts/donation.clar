;; Donation DApp contract

(define-map donations { donor: principal } { amount: uint })
(define-data-var total-donated uint u0)

(define-public (donate (amount uint))
  (begin
    (map-set donations { donor: tx-sender } { amount })
    (var-set total-donated (+ (var-get total-donated) amount))
    (ok "Donation recorded")
  )
)

(define-read-only (get-donation (donor principal))
  (map-get? donations { donor })
)

(define-read-only (get-total-donated)
  (var-get total-donated)
)
