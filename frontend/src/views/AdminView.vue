<template>
  <div class="admin-view min-h-screen bg-vintage-bg py-8 px-4">
    <div class="container mx-auto max-w-7xl">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-5xl font-heading font-bold text-vintage-primary mb-2">Admin Panel</h1>
          <p class="text-lg font-body text-vintage-text">Manage your products and categories</p>
        </div>
        <router-link to="/">
          <Button label="Back to Home" icon="pi pi-home" class="p-button-outlined" />
        </router-link>
      </div>

      <!-- Tabs -->
      <TabView>
        <!-- Products Tab -->
        <TabPanel header="Products Management">
          <div class="mb-4 flex justify-between items-center">
            <h2 class="text-2xl font-heading font-bold text-vintage-primary">Products</h2>
            <Button label="Add Product" icon="pi pi-plus" @click="openProductDialog()" />
          </div>

          <DataTable
            :value="products"
            :paginator="true"
            :rows="10"
            :loading="productsLoading"
            responsiveLayout="scroll"
            class="p-datatable-sm"
            stripedRows
            :globalFilterFields="['name', 'description']"
            v-model:filters="productFilters"
            filterDisplay="row"
          >
            <template #header>
              <div class="flex justify-between items-center">
                <span class="p-input-icon-left w-full md:w-auto">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="productFilters['global'].value"
                    placeholder="Search products..."
                    class="w-full md:w-80"
                  />
                </span>
              </div>
            </template>

            <template #empty>
              <div class="text-center py-8">
                <i class="pi pi-inbox text-5xl text-vintage-accent mb-3"></i>
                <p class="text-vintage-text font-body">
                  No products found. Click "Add Product" to create one.
                </p>
              </div>
            </template>

            <Column field="id" header="ID" :sortable="true" style="width: 5%"></Column>

            <Column header="Image" style="width: 10%">
              <template #body="slotProps">
                <img
                  :src="slotProps.data.image_url"
                  :alt="slotProps.data.name"
                  class="w-16 h-16 object-cover rounded shadow"
                />
              </template>
            </Column>

            <Column field="name" header="Name" :sortable="true" style="width: 20%">
              <template #body="slotProps">
                <span class="font-semibold">{{ slotProps.data.name }}</span>
              </template>
            </Column>

            <Column field="description" header="Description" style="width: 30%">
              <template #body="slotProps">
                <span class="text-sm">{{ slotProps.data.description }}</span>
              </template>
            </Column>

            <Column field="price" header="Price" :sortable="true" style="width: 10%">
              <template #body="slotProps">
                <span class="font-bold text-vintage-primary">Rs. {{ slotProps.data.price }}</span>
              </template>
            </Column>

            <Column field="category_id" header="Category" :sortable="true" style="width: 15%">
              <template #body="slotProps">
                <Tag
                  :value="getCategoryName(slotProps.data.category_id)"
                  class="bg-vintage-accent text-white"
                />
              </template>
            </Column>

            <Column header="Actions" style="width: 10%">
              <template #body="slotProps">
                <div class="flex gap-2">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-sm p-button-warning"
                    @click="openProductDialog(slotProps.data)"
                    v-tooltip.top="'Edit'"
                  />
                  <Button
                    icon="pi pi-trash"
                    class="p-button-sm p-button-danger"
                    @click="confirmDeleteProduct(slotProps.data)"
                    v-tooltip.top="'Delete'"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </TabPanel>

        <!-- Categories Tab -->
        <TabPanel header="Categories Management">
          <div class="mb-4 flex justify-between items-center">
            <h2 class="text-2xl font-heading font-bold text-vintage-primary">Categories</h2>
            <Button label="Add Category" icon="pi pi-plus" @click="openCategoryDialog()" />
          </div>

          <DataTable
            :value="categories"
            :loading="categoriesLoading"
            responsiveLayout="scroll"
            class="p-datatable-sm"
            stripedRows
          >
            <template #empty>
              <div class="text-center py-8">
                <i class="pi pi-inbox text-5xl text-vintage-accent mb-3"></i>
                <p class="text-vintage-text font-body">
                  No categories found. Click "Add Category" to create one.
                </p>
              </div>
            </template>

            <Column field="id" header="ID" :sortable="true" style="width: 20%"></Column>

            <Column field="name" header="Category Name" :sortable="true" style="width: 60%">
              <template #body="slotProps">
                <Tag :value="slotProps.data.name" class="text-lg bg-vintage-primary text-white" />
              </template>
            </Column>

            <Column header="Actions" style="width: 20%">
              <template #body="slotProps">
                <div class="flex gap-2">
                  <Button
                    icon="pi pi-trash"
                    class="p-button-sm p-button-danger"
                    @click="confirmDeleteCategory(slotProps.data)"
                    v-tooltip.top="'Delete'"
                  />
                </div>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabView>

      <!-- Product Dialog -->
      <Dialog
        v-model:visible="productDialogVisible"
        :header="editingProduct ? 'Edit Product' : 'Add New Product'"
        :modal="true"
        :style="{ width: '50vw' }"
        :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
      >
        <form @submit.prevent="saveProduct" class="space-y-4">
          <div class="flex flex-column gap-2">
            <label for="productName" class="font-body font-semibold text-vintage-text">
              Product Name *
            </label>
            <InputText
              id="productName"
              v-model="productForm.name"
              required
              placeholder="e.g., Cappuccino"
            />
          </div>

          <div class="flex flex-column gap-2">
            <label for="productDescription" class="font-body font-semibold text-vintage-text">
              Description *
            </label>
            <Textarea
              id="productDescription"
              v-model="productForm.description"
              required
              rows="3"
              placeholder="Describe your product..."
            />
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="flex flex-column gap-2">
              <label for="productPrice" class="font-body font-semibold text-vintage-text">
                Price (Rs.) *
              </label>
              <InputNumber
                id="productPrice"
                v-model="productForm.price"
                required
                :min="0"
                :step="10"
                placeholder="0.00"
                mode="currency"
                currency="LKR"
                locale="en-LK"
              />
            </div>

            <div class="flex flex-column gap-2">
              <label for="productCategory" class="font-body font-semibold text-vintage-text">
                Category *
              </label>
              <Dropdown
                id="productCategory"
                v-model="productForm.category_id"
                :options="categories"
                optionLabel="name"
                optionValue="id"
                placeholder="Select a category"
                required
              />
            </div>
          </div>

          <div class="flex flex-column gap-2">
            <label for="productImage" class="font-body font-semibold text-vintage-text">
              Image URL *
            </label>
            <InputText
              id="productImage"
              v-model="productForm.image_url"
              required
              placeholder="https://images.unsplash.com/..."
            />
            <small class="text-vintage-accent">
              Tip: Use Unsplash or similar for high-quality images
            </small>
          </div>

          <div v-if="productForm.image_url" class="flex flex-column gap-2">
            <label class="font-body font-semibold text-vintage-text">Image Preview</label>
            <img
              :src="productForm.image_url"
              alt="Preview"
              class="w-full h-48 object-cover rounded shadow"
              @error="imageError = true"
            />
            <small v-if="imageError" class="text-red-500">
              Failed to load image. Please check the URL.
            </small>
          </div>

          <div class="flex justify-end gap-2 pt-4">
            <Button
              label="Cancel"
              icon="pi pi-times"
              class="p-button-text"
              @click="productDialogVisible = false"
              type="button"
            />
            <Button
              :label="editingProduct ? 'Update' : 'Create'"
              icon="pi pi-check"
              type="submit"
              :loading="productSubmitting"
            />
          </div>
        </form>
      </Dialog>

      <!-- Category Dialog -->
      <Dialog
        v-model:visible="categoryDialogVisible"
        header="Add New Category"
        :modal="true"
        :style="{ width: '30vw' }"
        :breakpoints="{ '960px': '50vw', '640px': '90vw' }"
      >
        <form @submit.prevent="saveCategory" class="space-y-4">
          <div class="flex flex-column gap-2">
            <label for="categoryName" class="font-body font-semibold text-vintage-text">
              Category Name *
            </label>
            <InputText
              id="categoryName"
              v-model="categoryForm.name"
              required
              placeholder="e.g., Coffee, Brownies, Pastries"
            />
          </div>

          <div class="flex justify-end gap-2 pt-4">
            <Button
              label="Cancel"
              icon="pi pi-times"
              class="p-button-text"
              @click="categoryDialogVisible = false"
              type="button"
            />
            <Button label="Create" icon="pi pi-check" type="submit" :loading="categorySubmitting" />
          </div>
        </form>
      </Dialog>

      <!-- Delete Confirmation Dialog -->
      <Dialog
        v-model:visible="deleteDialogVisible"
        header="Confirm Deletion"
        :modal="true"
        :style="{ width: '30vw' }"
        :breakpoints="{ '960px': '50vw', '640px': '90vw' }"
      >
        <div class="flex items-center gap-3">
          <i class="pi pi-exclamation-triangle text-4xl text-orange-500"></i>
          <span class="font-body text-vintage-text">
            Are you sure you want to delete
            <strong>{{ itemToDelete?.name }}</strong>
            ? This action cannot be undone.
          </span>
        </div>

        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="deleteDialogVisible = false"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="executeDelete"
            :loading="deleteSubmitting"
          />
        </template>
      </Dialog>

      <!-- Toast -->
      <Toast position="top-right" />
    </div>
  </div>
</template>

<script setup>
import { categoryService, productService } from '@/services/api';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// PrimeVue Components
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';

const router = useRouter();
const toast = useToast();

// State
const products = ref([]);
const categories = ref([]);
const productsLoading = ref(true);
const categoriesLoading = ref(true);

// Product Dialog
const productDialogVisible = ref(false);
const editingProduct = ref(null);
const productSubmitting = ref(false);
const imageError = ref(false);
const productForm = ref({
  name: '',
  description: '',
  price: 0,
  category_id: null,
  image_url: '',
});

// Category Dialog
const categoryDialogVisible = ref(false);
const categorySubmitting = ref(false);
const categoryForm = ref({
  name: '',
});

// Delete Dialog
const deleteDialogVisible = ref(false);
const deleteSubmitting = ref(false);
const itemToDelete = ref(null);
const deleteType = ref(''); // 'product' or 'category'

// Filters
const productFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

// Methods
const fetchProducts = async () => {
  try {
    productsLoading.value = true;
    const data = await productService.getAll();
    products.value = data;
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load products',
      life: 3000,
    });
    loadDemoProducts();
  } finally {
    productsLoading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    categoriesLoading.value = true;
    const data = await categoryService.getAll();
    categories.value = data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load categories',
      life: 3000,
    });
    loadDemoCategories();
  } finally {
    categoriesLoading.value = false;
  }
};

const loadDemoProducts = () => {
  products.value = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Rich and bold espresso shot',
      price: 350,
      category_id: 1,
      image_url: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800',
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Perfectly balanced espresso with steamed milk',
      price: 450,
      category_id: 1,
      image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800',
    },
  ];
};

const loadDemoCategories = () => {
  categories.value = [
    { id: 1, name: 'Coffee' },
    { id: 2, name: 'Brownies' },
    { id: 3, name: 'Pastries' },
    { id: 4, name: 'Desserts' },
  ];
};

const getCategoryName = (categoryId) => {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.name : 'Unknown';
};

// Product CRUD
const openProductDialog = (product = null) => {
  editingProduct.value = product;
  imageError.value = false;

  if (product) {
    productForm.value = { ...product };
  } else {
    productForm.value = {
      name: '',
      description: '',
      price: 0,
      category_id: null,
      image_url: '',
    };
  }

  productDialogVisible.value = true;
};

const saveProduct = async () => {
  try {
    productSubmitting.value = true;

    if (editingProduct.value) {
      await productService.update(editingProduct.value.id, productForm.value);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product updated successfully',
        life: 3000,
      });
    } else {
      await productService.create(productForm.value);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product created successfully',
        life: 3000,
      });
    }

    productDialogVisible.value = false;
    await fetchProducts();
  } catch (error) {
    console.error('Error saving product:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to save product. Please check your connection.',
      life: 3000,
    });

    // For demo purposes, add to local array
    if (!editingProduct.value) {
      const newProduct = {
        id: products.value.length + 1,
        ...productForm.value,
      };
      products.value.push(newProduct);
      productDialogVisible.value = false;

      toast.add({
        severity: 'info',
        summary: 'Demo Mode',
        detail: 'Product added locally (backend not connected)',
        life: 3000,
      });
    } else {
      const index = products.value.findIndex((p) => p.id === editingProduct.value.id);
      if (index !== -1) {
        products.value[index] = { ...productForm.value, id: editingProduct.value.id };
        productDialogVisible.value = false;

        toast.add({
          severity: 'info',
          summary: 'Demo Mode',
          detail: 'Product updated locally (backend not connected)',
          life: 3000,
        });
      }
    }
  } finally {
    productSubmitting.value = false;
  }
};

const confirmDeleteProduct = (product) => {
  itemToDelete.value = product;
  deleteType.value = 'product';
  deleteDialogVisible.value = true;
};

// Category CRUD
const openCategoryDialog = () => {
  categoryForm.value = { name: '' };
  categoryDialogVisible.value = true;
};

const saveCategory = async () => {
  try {
    categorySubmitting.value = true;

    await categoryService.create(categoryForm.value);
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Category created successfully',
      life: 3000,
    });

    categoryDialogVisible.value = false;
    await fetchCategories();
  } catch (error) {
    console.error('Error saving category:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to save category. Please check your connection.',
      life: 3000,
    });

    // For demo purposes, add to local array
    const newCategory = {
      id: categories.value.length + 1,
      name: categoryForm.value.name,
    };
    categories.value.push(newCategory);
    categoryDialogVisible.value = false;

    toast.add({
      severity: 'info',
      summary: 'Demo Mode',
      detail: 'Category added locally (backend not connected)',
      life: 3000,
    });
  } finally {
    categorySubmitting.value = false;
  }
};

const confirmDeleteCategory = (category) => {
  itemToDelete.value = category;
  deleteType.value = 'category';
  deleteDialogVisible.value = true;
};

const executeDelete = async () => {
  try {
    deleteSubmitting.value = true;

    if (deleteType.value === 'product') {
      await productService.delete(itemToDelete.value.id);
      await fetchProducts();
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product deleted successfully',
        life: 3000,
      });
    } else if (deleteType.value === 'category') {
      await categoryService.delete(itemToDelete.value.id);
      await fetchCategories();
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category deleted successfully',
        life: 3000,
      });
    }

    deleteDialogVisible.value = false;
  } catch (error) {
    console.error('Error deleting item:', error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete item. Please check your connection.',
      life: 3000,
    });

    // For demo purposes, delete from local array
    if (deleteType.value === 'product') {
      const index = products.value.findIndex((p) => p.id === itemToDelete.value.id);
      if (index !== -1) {
        products.value.splice(index, 1);
        deleteDialogVisible.value = false;

        toast.add({
          severity: 'info',
          summary: 'Demo Mode',
          detail: 'Product deleted locally (backend not connected)',
          life: 3000,
        });
      }
    } else if (deleteType.value === 'category') {
      const index = categories.value.findIndex((c) => c.id === itemToDelete.value.id);
      if (index !== -1) {
        categories.value.splice(index, 1);
        deleteDialogVisible.value = false;

        toast.add({
          severity: 'info',
          summary: 'Demo Mode',
          detail: 'Category deleted locally (backend not connected)',
          life: 3000,
        });
      }
    }
  } finally {
    deleteSubmitting.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<style scoped>
.admin-view {
  min-height: calc(100vh - 80px);
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: var(--vintage-primary);
  color: white;
  font-family: 'Playfair Display', serif;
}

:deep(.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link) {
  background: var(--vintage-primary);
  border-color: var(--vintage-primary);
  color: white;
}

:deep(.p-tabview .p-tabview-nav li .p-tabview-nav-link) {
  color: var(--vintage-text);
}

:deep(.p-tabview .p-tabview-nav li .p-tabview-nav-link:hover) {
  background: var(--vintage-accent);
  color: white;
}

:deep(.p-inputnumber-input) {
  width: 100%;
}
</style>
