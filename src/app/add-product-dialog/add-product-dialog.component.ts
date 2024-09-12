import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Products } from '../interfaces/products';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports:[MatDialogModule,MatFormFieldModule,MatSelectModule,ReactiveFormsModule,MatOptionModule,MatInputModule,CommonModule,MatIcon],
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  productForm = new FormGroup({
    productId: new FormControl(null, Validators.required),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    price: new FormControl({ value: 0, disabled: true }),
    total: new FormControl({ value: 0, disabled: true })
  });

  products: Products[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { products: Products[] }
  ) {
    this.products = data.products;
  }

  onProductChange() {
    const selectedProductId = this.productForm.get('productId')?.value;
    const selectedProduct = this.products.find(p => p.id === selectedProductId);

    if (selectedProduct) {
      this.productForm.patchValue({
        price: selectedProduct.precio,
        total: this.calculateTotal()
      });
    }
  }

  onQuantityChange() {
    this.productForm.patchValue({
      total: this.calculateTotal()
    });
  }

  calculateTotal() {
    const quantity = this.productForm.get('quantity')?.value || 0;
    const price = this.productForm.get('price')?.value || 0;
    return quantity * price;
  }

  onSave() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);  // Cerrar y pasar los datos al componente padre
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
