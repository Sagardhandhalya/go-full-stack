package userRoute

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAdd(t *testing.T) {
	total := Add(3, 4)
	assert.NotNil(t, total, "can not be nil.")
	assert.Equal(t, 9, total, "not cool man should have to be 7")
}
